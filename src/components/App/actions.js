/**
 * Подписка на события метадаты и установка свойств
 *
 * Created by Evgeniy Malyarov on 14.02.2021.
 */

import {load_ram} from '../../packages/superlogin-proxy';

export const init_state = {
  meta_loaded: false,
  common_loaded: false,
  doc_ram_loaded: false,
  complete_loaded: false,
  fetch: false,
  idle: false,
  page: {},
  offline: false,
  title: 'Окнософт',
  menu_open: window.innerWidth > 960,
  error: null,
  user: {
    logged_in: false,
    stop_log_in: false,
    try_log_in: false,
    log_error: '',
  },
  snack: null,
  alert: null,
  confirm: null,
  wnd_portal: null,
};

function log_in() {
  return fetch('/auth/couchdb')
    .then((res) => res.json())
    .then((res) => {
      const {classes: {PouchDB}, adapters: {pouch}, cat: {users}}= $p;
      const {props, remote, fetch} = pouch;
      props._auth = {username: res.id};
      props._suffix = res.suffix || '';
      props._user = res.ref;

      remote.ram = new PouchDB(pouch.dbpath('ram'), {skip_setup: true, owner: pouch, fetch});
      remote.doc = new PouchDB(pouch.dbpath('doc'), {skip_setup: true, owner: pouch, fetch});

      return users.create(res, false, true);
    });
}

export function actions(elm) {

  // скрипт инициализации структуры метаданных и модификаторы
  return Promise.resolve()
    .then(() => import('../../metadata'))
    .then((module) => module.init(elm))
    .then(() => {
      // font-awesome, roboto и стили metadata подгрузим асинхронно
      import('../../packages/roboto/font.css');
    })
    .then(() => {
      const {classes: {PouchDB}, adapters: {pouch}, job_prm, md, ui, cat: {users}} = $p;
      elm.setState({common_loaded: true});
      const {handleNavigate, handleIfaceState} = elm;
      //ui.dialogs.init({handleIfaceState, handleNavigate, {}});

      pouch.on({
        pouch_complete_loaded() {
          elm.setState({complete_loaded: true});
        },

        pouch_data_page(page) {
          elm.setState({page});
        },

        on_log_in(name) {
          elm.setState({user: {
              name,
              logged_in: true,
              try_log_in: false,
              log_error: '',
            }});

          const {remote, fetch} = pouch;
          remote.ram = new PouchDB(pouch.dbpath('ram'), {skip_setup: true, owner: pouch, fetch});

          return load_ram($p)
            .then(() => {
              const {roles} = $p.current_user || {};
              if(roles && (roles.includes('ram_editor') || roles.includes('doc_full'))) {
                pouch.local.sync.ram = pouch.remote.ram.changes({
                  since: 'now',
                  live: true,
                  include_docs: true
                })
                  .on('change', (change) => {
                    // информируем слушателей текущего сеанса об изменениях
                    if(change.doc.obj_delivery_state !== 'Шаблон') {
                      pouch.load_changes({docs: [change.doc]});
                      pouch.emit('ram_change', change);
                    }
                  })
                  .on('error', (err) => {
                    $p.record_log(err);
                  });
              }
            });
        }
      });

      md.once('predefined_elmnts_inited', () => {
        let res = Promise.resolve();
        res.then(() => pouch.emit('pouch_complete_loaded'));
      });

    });
}
