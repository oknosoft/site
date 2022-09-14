const http = require('http');
const httpProxy = require('http-proxy');
const {createHmac} = require('crypto');
const url = require('url');
const {name, version} = require('../../package.json');
const {user_node, zone, local_storage_prefix} = require('../../config/app.settings')();
const keepAliveAgent = new http.Agent({ keepAlive: true });
const getBody = require('./raw-body');
const {end404, end401} = require('./end');

const headerFields = {
  username: 'X-Auth-CouchDB-UserName',
  roles: 'X-Auth-CouchDB-Roles',
  token: 'X-Auth-CouchDB-Token',
  host: 'Host',
  cookie: 'Cookie',
  clear(headers) {
    for(const field in headers){
      if(typeof headers[field] === 'string') {
        if (!(field in {'accept': '', 'content-type': '', 'accept-encoding': '', 'accept-language': ''})) {
          delete headers[field];
        }
      }
    }
    delete headers.authorization;
  }
};

// Create a superlogin_proxy server with custom application logic
const proxy = httpProxy.createProxyServer({
  xfwd: true,
  agent: keepAliveAgent,
});

module.exports = function ({cat, doc, job_prm, utils, adapters: {pouch}}, log) {

  proxy.on('proxyRes', setVia);
  proxy.on('error', (err) => {
    log(err.message || err, 'error');
  });

  return async function couchdbProxy(req, res, auth) {
    // You can define here your custom logic to handle the request
    // and then superlogin_proxy the request.

    let {parsed: {query, path}, headers, user}  = req;

    if((path.includes('/_utils') || path.includes('/_users')) && !(user.roles.includes('doc_full') || user.roles.includes('_admin'))) {
      return end401({req, res, err: {message: `patn ${path} for admins only, role 'doc_full' required`}, log});
    }

    let parts = new RegExp(`/${local_storage_prefix}(.*?)/`).exec(path);
    if((parts && parts[0] === 'meta') || path.includes(`/${local_storage_prefix}meta`)) {
      parts = [zone, 'ram'];
    }
    else if(parts && parts[1]) {
      parts = parts[1].split('_');
    }
    else if(['/couchdb/', '/couchdb/_session', '/_session'].includes(path)) {
      parts = [zone, ''];
    }
    else {
      return end404(res, path);
    }

    const server = new url.URL(job_prm.couch_local);

    const { username, roles, token, host } = headerFields;
    headerFields.clear(headers);
    if(user) {
      headers[username] = user.latin || encodeURIComponent(user.id);
      headers[roles] = JSON.parse(user.roles).join(',');
      headers[token] = sign(headers[username], user_node.secret);
      headers[host] = `${server.hostname}:${server.port}`;
    }

    if(query && query.includes('feed=longpoll')) {
      const upstreamReq = http.request({
        method: req.method,
        headers: headers,
        hostname: server.hostname,
        port: parseInt(server.port, 10),
        path: path.replace('/couchdb/', '/'),
        agent: keepAliveAgent,
      }, (upstreamRes) => {
        for(const header in upstreamRes.headers) {
          (header.startsWith('x-couch') || header === 'server') && res.setHeader(header, upstreamRes.headers[header]);
        }
        setVia(upstreamRes, req, res);
        upstreamRes.pipe(res);
      });
      if(req.method === 'POST' || req.method === 'PUT') {
        try{
          upstreamReq.write(await getBody(req));
        }
        catch(err) {}
      }
      upstreamReq.end();
    }
    else {
      const target = `${server.href.replace(new RegExp(server.pathname + '$'), '')}${path.replace('/couchdb/', '/')}`;
      proxy.web(req, res, {target, ignorePath: true});
    }
  };

};

// set via header
function setVia(proxyRes, req, res) {
  const existing = res.getHeader('Via');
  const viaheader = `${existing ? existing + ', ' : ''} ${name}/${version}`;
  res.setHeader('Via', viaheader);
}

// couchdb superlogin_proxy signed token
function sign(user, secret) {
  return createHmac('sha1', secret).update(user).digest('hex');
}



