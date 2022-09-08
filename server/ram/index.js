/**
 * Кластер общих данных
 * Используется не совсем по назначению - для единообразия с кластером auth-proxy а так же, для перезапуска по аварии
 *
 * @module index
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

const worker = require('./worker'),
  fs = require('fs'),
  runtime = {
    cluster: require('cluster'),
    root: __dirname,
    common: true,
  },
  conf = require('../../config/app.settings')(),
  log = require('../logger')(runtime);

if (runtime.cluster.isMaster) {

  const cpus = 1;
  let workers = [];

  // On worker die
  runtime.cluster.on('exit', function (worker) {
    for (let i = 0; i < workers.length; i++) {
      if(worker.id == workers[i].id) {
        workers[i] = null;
      }
    }
    workers = workers.filter((v) => v);
    workers.push(runtime.cluster.fork());
  });

  fs.watch(require.resolve('../../config/app.settings'), (event, filename) => {
    _restart('Config changed');
  });

  // Fork workers
  for (let i = 0; i < cpus; i++) {
    workers.push(runtime.cluster.fork());
  }

  // Restarter
  const _restart = function (msg) {
      log('Restart workers: ' + msg);
      let i = workers.length;
      while (i--) {
        setTimeout(_stop.bind(null, workers[i]), i * conf.workers.reloadOverlap);
      }
    },
    _stop = function (w) {
      if (w) {
        w.send({event: 'shutdown', time: Date.now()});
        setTimeout(_kill.bind(null, w), conf.workers.killDelay);
      }
    },
    _kill = function (w) {
      if(w && w.exitedAfterDisconnect === undefined) {
        w.kill();
      }
    },
    _restarter = function () {
      if ((new Date()).getHours() == (conf.workers.reloadAt || 0)) {
        _restart('Daily restart');
      }
    },
    restarter = setInterval(_restarter, 36e5);

}
else if(runtime.cluster.isWorker) {
  setTimeout(() => worker(runtime), 5000);
}
