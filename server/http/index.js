/**
 *
 *
 * @module index
 *
 * Created by Evgeniy Malyarov on 03.06.2019.
 */

const http = require('http');
const url = require('url');
const qs = require('qs');
const {RateLimiterCluster} = require('rate-limiter-flexible');
const {end401, end404, end500} = require('./end');

module.exports = function ($p, log, worker) {

  const {utils} = $p;
  const couchdbProxy = require('./proxy-couchdb')($p, log);
  const staticProxy = require('./static');
  const articles = require('../articles')($p, log);
  const adm = require('./adm')($p, log);
  const mdm = require('../mdm')($p, log);
  const auth = require('../auth')($p, log);
  const event_source = require('../mdm/event_source')($p, log, auth);
  const conf = require('../../config/app.settings')();

  const ipLimiter = new RateLimiterCluster({
    keyPrefix: 'ip', // Must be unique for each limiter
    points: conf.server.rater.ip.limit,
    duration: conf.server.rater.ip.interval,
    timeoutMs: 3000 // Promise is rejected, if master doesn't answer for 3 secs
  });

  function handler(req, res) {

    const {remotePort, remoteAddress} = res.socket;

    // проверяем лимит запросов в секунду
    ipLimiter.consume(`${req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || remoteAddress}`, 1)
      .catch((rateLimiterRes) => {
        if(rateLimiterRes instanceof Error) {
          rateLimiterRes.error = true;
          rateLimiterRes.status = 500;
          end500({req, res, log, rateLimiterRes});
          return rateLimiterRes;
        }
        return utils.sleep(20).then(() => rateLimiterRes);
      })
      .then(async (rateLimiterRes) => {

        if(rateLimiterRes instanceof Error) {
          return ;
        }
        if (rateLimiterRes?.remainingPoints < 2) {
          await utils.sleep(Math.abs(rateLimiterRes.remainingPoints - 2) * 10);
        }

        const parsed = req.parsed = url.parse(req.url);
        parsed.paths = parsed.pathname.replace('/', '').split('/');

        const {host} = req.headers;
        parsed.is_mdm = parsed.paths[0] === 'couchdb' && parsed.paths[1] === 'mdm';
        parsed.is_log = parsed.paths[0] === 'couchdb' && /_log$/.test(parsed.paths[1]);
        parsed.is_event_source = parsed.paths[0] === 'couchdb' && parsed.paths[1] === 'events';
        parsed.is_static =  /^(static|imgs)$/.test(parsed.paths[0]) ||
          /\.(json|ico|txt|js|map|webmanifest)$/.test(parsed.paths[0]);
        req.query = qs.parse(parsed.query);

        if(parsed.is_static) {
          return staticProxy(req, res, conf);
        }
        if(parsed.is_event_source) {
          return event_source(req, res);
        }
        if(parsed.is_mdm) {
          return mdm(req, res, conf);
        }
        if(['couchdb', '_session'].includes(parsed.paths[0])) {
          return couchdbProxy(req, res, auth);
        }
        if(await articles(req, res)) {
          return;
        }

        // пытаемся авторизовать пользователя
        return auth(req, res)
          .catch((err) => {
            end401({req, res, err, log});
            return null;
          })
          .then((user) => {
            if(user) {

              if(['adm', 'r', 'prm', 'plan'].includes(parsed.paths[0])) {
                return adm(req, res);
              }
              return end404(res, parsed.paths[0]);
            }
            else if(!res.finished) {
              return end401({req, res, err: parsed.paths[0], log});
            }
          })
          .catch((err) => {
            end500({req, res, err, log});
          });

      });
  };

  //
  // Create your custom server and just call `superlogin_proxy.web()` to superlogin_proxy
  // a web request to the target passed in the options
  // also you can use `superlogin_proxy.ws()` to superlogin_proxy a websockets request
  //
  const server = http.createServer(handler);
  server.listen(conf.server.port);

  log(`PROXY listen on port: ${conf.server.port}`);
};
