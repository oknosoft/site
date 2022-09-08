
/**
 * ### При установке параметров сеанса
 * Процедура устанавливает параметры работы программы при старте веб-приложения
 *
 * @param prm {Object} - в свойствах этого объекта определяем параметры работы программы
 */

const is_node = typeof process !== 'undefined' && process.versions && process.versions.node;
const local_storage_prefix = 'www_';

module.exports = function settings(prm = {}) {

  Object.defineProperties(prm, {
    use_google_geo: {
      get() {
        return '';
      }
    }
  });

  return Object.assign(prm, {

    is_node,

    // разделитель для localStorage
    local_storage_prefix,

    // гостевые пользователи для демо-режима
    guests: [],

    // расположение couchdb для nodejs
    couch_local: process.env.COUCHLOCAL || 'http://cou221:5984/www_',

    // расположение couchdb для браузера
    get couch_path() {
      return is_node ? this.couch_local : `/couchdb/${local_storage_prefix}`;
    },

    // по умолчанию, обращаемся к зоне 1
    zone: 0,

    // объявляем номер демо-зоны
    zone_demo: -1,

    // если use_meta === false, не используем базу meta в рантайме
    // см.: https://github.com/oknosoft/metadata.js/issues/255
    use_meta: false,
    use_ram: is_node ? true : false,

    // размер вложений 5Mb
    attachment_max_size: 5000000,

    // разрешаем сохранение пароля
    enable_save_pwd: true,

    // геокодер может пригодиться
    use_ip_geo: true,

    //
    keys: {
      geonames: 'oknosoft',
    },

    server: {
      prefix: '/adm/api',             // Mount path, no trailing slash
      port: process.env.PORT || 3033, // Port
      lang: process.env.LANG || 'ru', // язык текущего экземпляра
      start_common: Boolean(process.env.START_COMMON),
      common_url: process.env.RAMURL || 'http://localhost:3036',
      maxpost: 40 * 1024 * 1024,      // Max size of POST request
      abonents: process.env.ABONENTS ? JSON.parse(process.env.ABONENTS) : [0], // абоненты - источники
      branches: process.env.BRANCHES ? JSON.parse(process.env.BRANCHES) : null,     // список отделов можно ограничить
      single_db: true,                                    // использовать основную базу doc вместо перебора баз абонентов
      no_mdm: Boolean(process.env.NOMDM),
      disable_mdm: Boolean(process.env.DISABLEMDM),
      defer: (process.env.DEFER ? parseFloat(process.env.DEFER) : 20000) + Math.random() * 10000,  // задержка пересчета mdm
      rater: {                        // Request rate locker
        all: {                        // Total requests limit
          interval: 4,                // Seconds, collect interval
          limit: 2000,                // Max requests per interval - пока не используем
        },
        ip: {                         // Per-ip requests limit
          interval: 3,
          limit: 20,                 // Если limit > 20, добавляем задержку 20мс
        }
      },
    },

    workers: {
      count: process.env.WORKERS_COUNT ? parseFloat(process.env.WORKERS_COUNT) : 1,  // Total threads
      reloadAt: process.env.RELOAD_AT ? parseFloat(process.env.RELOAD_AT) : 3,       // Hour all threads are restarted
      reloadOverlap: 40e3,      // Gap between restarts of simultaneous threads
      killDelay: 10e3           // Delay between shutdown msg to worker and kill, ms
    },

  }, is_node && {
    // авторизация couchdb
    user_node: {
      username: process.env.DBUSER || 'admin',
      password: process.env.DBPWD || 'admin',
      secret: process.env.COUCHSECRET,
    },
  });

};
