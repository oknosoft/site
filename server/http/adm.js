/**
 * Обрабатывает запросы в иерархии /adm/
 * @module get
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

const {end404, end500} = require('./end');

module.exports = function ($p, log) {

  const {cat, cch, utils} = $p;
  const route = {};
  // подключаем плагины
  //require('wb-parametric')($p, log, route);

  return async (req, res) => {
    const {query, path, paths} = req.parsed;

    try {

      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ok: true}));

      // switch (paths[2]) {
      // case 'ram':
      //   return ram_data(req, res);
      //
      // default:
      //   if(route[paths[2]]) {
      //     return route[paths[2]](req, res);
      //   }
      //   else {
      //     end404(res, `${paths[0]}/${paths[1]}/${paths[2]}`);
      //   }
      // }
    }
    catch (err) {
      end500({req, res, err, log});
    }

  };
};
