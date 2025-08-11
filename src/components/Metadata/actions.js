/**
 * Подписка на события метадаты и установка свойств
 *
 * Created by Evgeniy Malyarov on 14.02.2021.
 */

import {load_ram, load_ram_splitted} from '../../packages/superlogin-proxy/no_ram';

const {innerWidth} = window;
export const init_state = {
  meta_loaded: false,
  common_loaded: false,
  doc_ram_loaded: false,
  complete_loaded: false,
  fetch: false,
  idle: false,
  page: {},
  offline: false,
  server_error: '',
  title: 'Окнософт',
  innerWidth,
  menu_open: innerWidth > 960,
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

export function actions(handleIfaceState) {

  // скрипт инициализации структуры метаданных и модификаторы
  return Promise.resolve()
    .then(() => import('../../metadata'))
    .then((module) => module.init(handleIfaceState))
    .then(() => {
      // font-awesome, roboto и стили metadata подгрузим асинхронно
      return Promise.all([
        import('metadata-ui/fontsource/roboto/300.css'),
        import('metadata-ui/fontsource/roboto/400.css'),
        import('metadata-ui/fontsource/roboto/500.css'),
        import('metadata-ui/fontsource/roboto/700.css'),
      ]);
    })
    .then(() => {
      import('react-data-grid/lib/styles.css')
        .then(() => import('../../styles/patch.css'))
        .then(() => import('metadata-ui/styles/indicator/index.css'));
      import('font-awesome/css/font-awesome.min.css');
    })
    .then(() => {
      const {classes: {PouchDB}, adapters: {pouch}, job_prm, md, ui, cat: {users}} = $p;
      handleIfaceState({common_loaded: true});
      //ui.dialogs.init({handleIfaceState, handleNavigate, {}});

      const {remote, fetch} = pouch;
      remote.ram = new PouchDB(pouch.dbpath('ram'), {skip_setup: true, owner: pouch, fetch});

      pouch.on({
        pouch_complete_loaded() {
          handleIfaceState({complete_loaded: true});
        },

        pouch_data_page(page) {
          handleIfaceState({page: {...page}});
        },

        user_log_fault(err) {
          handleIfaceState({server_error: err.message});
        },

        on_log_in(name) {
          handleIfaceState({user: {
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
