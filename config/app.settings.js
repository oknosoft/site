
/**
 * ### При установке параметров сеанса
 * Процедура устанавливает параметры работы программы при старте веб-приложения
 *
 * @param prm {Object} - в свойствах этого объекта определяем параметры работы программы
 */

const is_node = typeof process !== 'undefined' && process.versions && process.versions.node;
const local_storage_prefix = 'www_';
const env = is_node ? process.env : 0;

class JSVersion {

  constructor() {
    this.fetch()
      .then((version) => {
        this.raw = version || {build: "network error", stamp: 0};
        this.stamp = this.raw.stamp
      });
  }

  fetch() {
    return fetch('/build.json')
      .then(res => res.json())
      .catch(err => null);
  }

  check() {
    return this.fetch()
      .then((version) => {
        return !this.stamp || this.stamp === version.stamp;
      });
  }

}

module.exports = function settings(prm = {}) {

  Object.defineProperties(prm, {
    use_google_geo: {
      get() {
        return '';
      }
    },
    session_zone: {
      get() {
        return typeof sessionStorage === 'object' && sessionStorage.key('zone') ? sessionStorage.getItem('zone') : this.zone;
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
    couch_local: env?.COUCHLOCAL || `http://cou221:5984/${local_storage_prefix}`,

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
    use_ram: Boolean(is_node),

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
      port: env?.PORT || 3033, // Port
      lang: env?.LANG || 'ru', // язык текущего экземпляра
      start_common: Boolean(env?.START_COMMON),
      common_url: env?.RAMURL || 'http://localhost:3036',
      maxpost: 40 * 1024 * 1024,      // Max size of POST request
      abonents: env?.ABONENTS ? JSON.parse(env?.ABONENTS) : [0], // абоненты - источники
      branches: env?.BRANCHES ? JSON.parse(env?.BRANCHES) : null,     // список отделов можно ограничить
      single_db: true,                                    // использовать основную базу doc вместо перебора баз абонентов
      no_mdm: Boolean(env?.NOMDM),
      disable_mdm: Boolean(env?.DISABLEMDM),
      defer: (env?.DEFER ? parseFloat(env?.DEFER) : 20000) + Math.random() * 10000,  // задержка пересчета mdm
      paths: {
        '/adm/apidocs/wbcore': '../wb-core/jsdoc/wbcore',
      },
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
      count: env?.WORKERS_COUNT ? parseFloat(env?.WORKERS_COUNT) : 1,  // Total threads
      reloadAt: env?.RELOAD_AT ? parseFloat(env?.RELOAD_AT) : 3,       // Hour all threads are restarted
      reloadOverlap: 40e3,      // Gap between restarts of simultaneous threads
      killDelay: 10e3           // Delay between shutdown msg to worker and kill, ms
    },

  }, is_node && {
    // авторизация couchdb
    user_node: {
      username: env?.DBUSER || 'admin',
      password: env?.DBPWD || 'admin',
      secret: env?.COUCHSECRET,
    },
  });

  // текущая версия js
  prm.version = new JSVersion();

};
