/**
 * Автоматический пересчет кеша
 * - слушаем с фильтром базы doc, ram, meta, формируем очередь изменений
 *
 * @module auto_recalc
 *
 * Created by Evgeniy Malyarov on 20.11.2019.
 */

const fs = require('fs');
const {readFile, writeFile, symlink, unlink, readlink} = require('node:fs/promises');
//const rimraf = require('rimraf');
const {resolve} = require('path');
const check_mdm = require('./check_mdm');
const load_predefined = require('./load_predefined');
const dyn_mdm = require('./dyn_mdm');
const fetch = require('node-fetch');


module.exports = function auto_recalc($p, log) {

  const {
    cat: {},
    doc: {calc_order},
    cch: {mdm_groups},
    ireg: {},
    utils, job_prm, md, adapters: {pouch}, pricing} = $p;
  const {by_branch, common, order} = require('./index');
  const load_order = order(md);

  // оповещает клиентский поток об изменениях
  // TODO заменить на регистрацию клиента и обход зарегистрированных для поддержки многопоточности
  function notify(abonent, branch, types, port) {
    const {ref} = utils.blank;
    fetch(`http://localhost:${port}/couchdb/events/mdm_change`, {
      method: 'POST',
      body: JSON.stringify({abonent: ref, branch: ref, types}),
    })
      .catch(() => null);
  }

  // корректировка данных
  function patch(o, name, abonent, branch) {
    if(!o.toJSON) {
      return o;
    }
    const v = o.toJSON();

    // физлиц храним внутри пользователей
    if(name === 'cat.users') {
      if(!o.individual_person.empty()) {
        v.person = o.individual_person.toJSON();
      }
    }
    //прочищаем спецификацию характеристики со статусом Шаблон

    return v;
  }

  const changes = {

    timer: {
      /**
       * текущий идентификатор timeout
       */
      id: null,

      /**
       * текущий штамп
       */
      stamp: 0,
    },

    /**
     * флаг пересчета
     */
    recalcing: false,

    /**
     * флаг загруженности данных
     */
    loaded: false,

    /**
     * очередь изменений
     */
    queue: {
      _1: new Set(),
      _2: new Set(),

      /**
       * признак использования второй очереди
       */
      swap: false,

      get() {
        return this.swap ? this._2 : this._1;
      }
    },

    /**
     * Регистрирует изменения одного или всех типов данных
     * @param [type] {string|array|undefined}
     */
    register(type) {
      // пока всё не загружено, ничего не регистрируем
      if(!this.loaded) {
        return;
      }

      const queue = this.queue.get();
      if(!type) {
        for (const types of load_order) {
          for (const type of types) {
            queue.add(type);
          }
        }
      }
      else if(Array.isArray(type)) {
        for (const el of type) {
          queue.add(el);
        }
      }
      else {
        queue.add(type);
      }

      const now = Date.now();
      const {timer} = this;
      if(timer.id) {
        // если с момента прошлой регистрации прошло немного времени - откладываем
        if((now - timer.stamp) < (job_prm.server.defer / 2)) {
          clearTimeout(timer.id);
          timer.id = setTimeout(this.recalc.bind(this), job_prm.server.defer);
        }
        // иначе - выполним пересчет по расписанию прежней регистрации
      }
      else {
        // после пересчета прошло более 5 минут - запускаем таймер в лоб
        timer.id = setTimeout(this.recalc.bind(this), job_prm.server.defer);
        timer.stamp = now;
      }

    },

    /**
     * Пересчет для всех абонентов и всех отделов абонентов
     */
    async recalc() {

      if(job_prm.server.disable_mdm) {
        return;
      }

      const {timer, recalcing} = this;
      if(timer.id) {
        clearTimeout(timer.id);
        timer.id = null;
      }
      if(recalcing) {
        timer.id = setTimeout(this.recalc.bind(this), job_prm.server.defer);
        timer.stamp = Date.now();
        return;
      }
      this.recalcing = true;

      const queue = this.queue.get();
      const types = Array.from(queue);
      this.queue.swap = !this.queue.swap;
      queue.clear();
      log(`Recalcing ${types.length > 6 ? types.length.toFixed() + ' types' : types.join(',')}`);

      try {
        // пересчет корня текущего абонента
        await recalc({
          suffix: 'common',
          types,
        });
      }
      catch (e) {
        log(e);
        this.register(types);
      }

      this.recalcing = false;
    },

  };

  function mkpaths(zone, suffix = 'common') {
    // путь кеша текущей зоны
    if(!fs.existsSync(resolve(__dirname, `./cache/${zone}`))) {
      fs.mkdirSync(resolve(__dirname, `./cache/${zone}`));
    }
    // путь кеша текущего отдела
    if(!fs.existsSync(resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}`))) {
      fs.mkdirSync(resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}`));
    }
  }

  async function recalc({abonent, branch, abranches, suffix, types}) {

    const zone = '0';
    const ctypes = [];

    mkpaths(zone, suffix);

    const manifest = resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}/manifest.json`);
    let tags = {};
    if(fs.existsSync(manifest)) {
      try {
        tags = JSON.parse(await readFile(manifest, 'utf8'));
      }
      catch (e) {}
    }

    for(const name of types) {
      const mgr = common.includes(name) && md.mgr_by_class_name(name);
      if(mgr) {
        let fname = suffix === 'common' ?
          resolve(__dirname, `./cache/${zone}/0000/${name}.json`)
          :
          resolve(__dirname, `./cache/${zone}/${by_branch.includes(name) ? suffix : '0000'}/${name}.json`);

        // в папках отделов держим только фильтруемые по отделу файлы
        if(branch && !branch.empty() && !by_branch.includes(name)){
          continue;
        }

        const rows = [];
        (name === 'cch.predefined_elmnts' ? await load_predefined(pouch.remote.ram) : mgr).forEach((o) => {
          if(check_mdm({o, name, abonent, branch, abranches, job_prm}) && (!mdm_groups || mdm_groups.check({o, name, abonent, branch}))) {
            rows.push(patch(o, name, abonent, branch));
          }
        });
        //log(`Recaled ${zone}:${suffix === 'common' ? '0000' : suffix} ${name}`);

        const text = JSON.stringify({name, rows}) + '\r\n';
        const tag = tags[name];
        // если данные реально изменены - записываем
        if(!tag || tag.count !== rows.length || tag.size !== text.length || tag.crc32 !== utils.crc32(text) || !fs.existsSync(fname)) {
          tags[name] = {
            count: rows.length,
            size: text.length,
            crc32: utils.crc32(text),
          };
          await writeFile(fname, text, 'utf8');
          ctypes.push(name);

        }
      }
    }

    if(ctypes.length) {
      await writeFile(manifest, JSON.stringify(tags), 'utf8');
      // оповещение пока только для пустого отдела
      notify(abonent, branch, ctypes, job_prm.server.port);
    }

    return utils.sleep();
  }

  // инициируем стартовый пересчет
  pouch.once('pouch_complete_loaded', () => {
    setTimeout(() => {
      changes.loaded = true;
      changes.register();
    }, job_prm.server.defer / 3);
  });

  // регистрируем для будущего пересчета
  pouch.on('ram_change', (change) => {
    try {
      const class_name = change.id.split('|')[0];
      changes.register(class_name);
      if(class_name === 'cch.predefined_elmnts') {
        const {types} = change.doc.type;
        types && types.forEach((type) => {
          type.includes('.') && changes.register(type);
        });
      }
    }
    catch (e) {}
  });

  return changes;

};
