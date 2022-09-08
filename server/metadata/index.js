

// конструктор MetaEngine
const MetaEngine = require('metadata-core')
  .plugin(require('metadata-pouchdb'));

// функция установки параметров сеанса
const settings = require('../../config/app.settings');

// функция инициализации структуры метаданных
const meta_init = require('../../src/metadata/init');

const ram_changes = require('./changes_ram');


module.exports = function (log, is_common) {

  // создаём контекст MetaEngine
  const $p = new MetaEngine();
  log('created MetaEngine');

  const on_log_in = require('./on_log_in')(log);

  // параметры сеанса инициализируем сразу
  $p.wsql.init(settings);

  // реквизиты подключения к couchdb
  const {user_node} = settings();

  // выполняем скрипт инициализации метаданных
  meta_init($p);

  // сообщяем адаптерам пути, суффиксы и префиксы
  const {wsql, job_prm, adapters: {pouch}, classes, cat, ireg} = $p;
  job_prm.is_common = is_common;
  wsql.set_user_param('user_name', user_node.username);
  if(user_node.suffix) {
    pouch.props._suffix = user_node.suffix;
  }
  if(user_node.templates) {
    job_prm.templates = user_node.templates;
  }
  pouch.init(wsql, job_prm);

  // подключим модификаторы
  //modifiers($p, log);

  // подключаем обработчики событий адаптера данных
  pouch.on({
    user_log_in(name) {
      log(`logged in ${job_prm.couch_local}, user:${name}, zone:${job_prm.zone}`);
    },
    on_log_in() {
      return on_log_in({pouch, classes, job_prm, cat, ireg});
    },
    user_log_fault(err) {
      log(`login error ${err}`);
    },
    pouch_load_start(page) {
      log('load to ram: start');
    },
    pouch_data_page(page) {
      log(`load to ram: page №${page.page} (${page.page * page.limit} from ${page.total_rows})`);
    },
    pouch_doc_ram_loaded() {
      ram_changes($p, log, is_common);
      log(`load to ram: complete`);
      pouch.emit('pouch_complete_loaded');
    },
  });

  // инициализируем метаданные
  // загружаем кешируемые справочники в ram и начинаем следить за изменениями ram
  return pouch
    .log_in(user_node.username, user_node.password)
    .then(() => pouch.load_data(pouch.remote.ram))
    .then(() => {
      setTimeout(() => {
        pouch.emit('pouch_doc_ram_loaded');
      }, job_prm.server.defer / 10);
      return $p;
    });
}
