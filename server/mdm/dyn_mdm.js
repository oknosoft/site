/**
 * Динамически рассчитывает принадлежность
 *
 * @module dyn_mdm
 *
 * Created by Evgeniy Malyarov on 01.11.2019.
 */

const break_types = ['cch.properties', 'cat.destinations', 'cat.users', 'cat.partners', 'cat.units', 'cat.nom_units', 'cat.nom_kinds', 'cat.nom_group'];
const restrict = ['cat.furns', 'cat.nom', 'cat.inserts', 'cat.cnns', 'cat.clrs', 'cat.production_params'];

module.exports = {

  dedup: new Set(),

  // добавляем ссылку в кеш и ищем её вложенные ссылки
  add(v) {
    if(v && v._manager && !v.empty()) {
      if(!this.dedup.has(v)) {
        this.dedup.add(v);
        this.links(v, true);
      }
    }
  },

  // цикл по полям объекта или строки
  sub_links(obj, fields) {
    for(const fld in fields) {
      const {type} = fields[fld];
      if(type.is_ref && !type.types.some(v => break_types.includes(v)) && !type.types[0].startsWith('enm.')) {
        this.add(obj[fld]);
      }
    }
  },

  // цикл по объекту и строкам табчастей
  links(obj, force) {
    if(!force && (!obj || !obj.empty || obj.empty() || this.dedup.has(obj))) {
      return;
    }
    const {fields, tabular_sections} = obj._metadata();
    this.sub_links(obj, fields);
    for(const ts in tabular_sections) {
      const {fields} = tabular_sections[ts];
      obj[ts].forEach((row) => {
        this.sub_links(row, fields);
      });
    }
    this.dedup.add(obj);
    // если объект является папкой, добавляем всех его детей
    if(obj.is_folder && obj._children) {
      for(const child of obj._children()) {
        this.links(child);
      }
    }
  },

  check(o) {
    return !restrict.includes(o._manager.class_name) || !this.dedup.size || this.dedup.has(o) || o.is_folder || o.predefined_name;
  },

  cnns({cnns}) {
    cnns.forEach((cnn) => {
      if(!this.dedup.has(cnn)) {
        cnn.cnn_elmnts.forEach((row) => {
          if(this.dedup.has(row.nom1) || this.dedup.has(row.nom2)) {
            this.links(cnn);
            return false;
          }
        });
      }
    });
  },

  // кеш для внешних модулей
  templates: new Set(),

  characteristics: new Set(),

  prepare(objs, tmplts, {cat, job_prm, doc}) {
    // чистим кеш ссылок
    this.dedup.clear();
    if(!Array.isArray(objs)) {
      objs = Object.values(objs);
    }

    let res = Promise.resolve();

    // дополняем предопределенными элементами
    Object.values(job_prm.nom).forEach((obj) => {
      if(!obj.is_folder) {
        res = res.then(() => this.links(obj));
      };
    });

    // формируем кеш по массиву входящих ссылок
    for(const obj of objs) {
      res = res.then(() => this.links(obj));
    }

    return res
      // дополняем кеш ссылками соединений
      .then(() => objs.length && this.cnns(cat))
      .then(() => {
        // чистим кеш заказов-шаблонов и характеристик
        this.templates.clear();
        this.characteristics.clear();
        for(const tmpl of tmplts) {
          if(tmpl.production.count()) {
            const {characteristic} = tmpl.production.get(0);
            if(characteristic && !characteristic.empty()) {
              this.characteristics.add(characteristic);
              this.templates.add(tmpl);
            }
          }
        }
        for (const {outline} of cat.production_params) {
          if(!outline.empty()) {
            this.characteristics.add(outline);
          }
        }
      });
  },

};

