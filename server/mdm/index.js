/**
 * ### Обрабатывает запросы /mdm/
 * Возвращает обрезанную ram
 *
 * @module get
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

const {end404, end500} = require('../http/end');
const fs = require('fs');
const {readFile} = require('node:fs/promises');
const {resolve} = require('path');
const merge2 = require('merge2');
const manifest = require('./manifest');
const head = require('./head');

// эти режем по отделу
const by_branch = [];
// эти общие - их не режем и грузим сразу
const common = [
  'cch.properties',
  'cat.property_values',
  'cat.property_values_hierarchy',
  'cat.units',
  'cat.countries',
  'cat.currencies',
  'cat.scheme_settings',
  'cat.meta_ids',
  'cat.destinations',
  'cat.nom_groups',
  'cat.nom_kinds',
  'cat.nom',
  'cat.organizations',
  'cat.partners',
  'cat.tags',
  'cch.predefined_elmnts',
];

function mdm ($p, log) {

  const {md, cat: {branches, users}, utils, job_prm, adapters: {pouch}} = $p;
  // порядок загрузки, чтобы при загрузке меньше оборванных ссылок
  const load_order = order(md);

  return async (req, res) => {
    const {query, path, paths} = req.parsed;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    try{
      const {user, parsed: {query, path, paths}, headers} = req;
      let zone = req.zone || headers.zone;
      let suffix = 'common';

      // если данные не общие, проверяем пользователя
      if(suffix !== 'common' && !user) {
        return end500({req, res, err: {status: 403, message: 'Пользователь не авторизован'}, log});
      }

      if(req.method === 'HEAD') {
        return await head({res, zone, suffix, by_branch, common});
      }

      // проверяем наличие каталога
      if(!fs.existsSync(resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}`))) {
        return end404(res, `/couchdb/mdm/${zone}/${suffix === 'common' ? '0000' : suffix}`);
      }
      // пишем манифест в head
      await manifest({res, zone, suffix, by_branch, common});

      const tags = {};
      const stream = merge2();
      const types = headers.types ? headers.types.split(',') : null;
      for(const names of load_order) {
        for(const name of names) {
          // если запросили определенные типы данных, возвращаем только их
          if(types && !types.includes(name)) {
            continue;
          }
          const mgr = md.mgr_by_class_name(name);
          if(mgr) {
            const fname = suffix === 'common' ?
              resolve(__dirname, `./cache/${zone}/0000/${name}.json`)
              :
              resolve(__dirname, `./cache/${zone}/${by_branch.includes(name) ? suffix : '0000'}/${name}.json`);

            if(suffix === 'common' && !common.includes(name)) {
              continue;
            }
            if(suffix !== 'common' && common.includes(name)) {
              continue;
            }
            // если файл существует, добавляем его в поток
            fs.existsSync(fname) && stream.add(fs.createReadStream(fname));
          }
        }
      }
      //suffix === 'common' && current_branch({stream, branches, users, headers, utils});
      stream.pipe(res);
      res.on('close', () => stream.destroy());
    }
    catch(err){
      end500({req, res, err, log});
    }

  };
}

function order (md) {
  const res = [
    new Set(['cch.properties']),
    new Set(),
    new Set(),
    new Set(),
    new Set(),
    new Set(),
    new Set(['cch.predefined_elmnts'])
  ];

  for(const class_name of md.classes().cat) {
    if(['servers', 'nom_units', 'meta_fields', 'meta_objs'].includes(class_name)) {
      continue;
    }
    else if(['abonents', 'property_values', 'property_values_hierarchy', 'contact_information_kinds', 'currencies'].includes(class_name)) {
      res[1].add(`cat.${class_name}`);
    }
    else if(class_name === 'users') {
      res[2].add(`cat.${class_name}`);
    }
    else if(class_name.includes('nom')) {
      res[3].add(`cat.${class_name}`);
    }
    else if(class_name === 'formulas') {
      res[5].add(`cat.${class_name}`);
    }
    else if(class_name === 'choice_params') {
      res[6].add(`cat.${class_name}`);
    }
    else{
      res[4].add(`cat.${class_name}`);
    }
  }

  return res;
}

mdm.by_branch = by_branch;
mdm.order = order;
mdm.common = common;

module.exports = mdm;
