/**
 * Создаёт базы meta в адаптере
 *
 * @module on_log_in
 *
 * Created by Evgeniy Malyarov on 02.06.2019.
 */

module.exports = function on_log_in(log) {
  return function on_log_in({pouch, classes, job_prm, cat, ireg}) {
    const {auth} = pouch.remote.ram.__opts;
    const opts = {skip_setup: true, auth, owner: pouch};
    if(!pouch.local.meta) {
      pouch.remote.meta = new classes.PouchDB(pouch.props.path + 'meta', opts);
      Object.defineProperty(pouch.local, 'meta', {get(){ return pouch.remote.meta;}});
    }
    return pouch.remote.meta.info()
        .then(() => {
          // грузим из meta
          let res = Promise.resolve();
          return res;
        });
  };
}
