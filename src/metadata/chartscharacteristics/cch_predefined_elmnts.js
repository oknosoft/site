/**
 * ### Дополнительные методы ПВХ Предопределенные элементы
 * Предопределенные элементы - аналог констант для хранения ссылочных и списочных настроек приложения
 *
 * &copy; Evgeniy Malyarov http://www.oknosoft.ru 2014-2018
 * @module cch_predefined_elmnts
 */

exports.CchPredefined_elmntsManager = class CchPredefined_elmntsManager extends Object {

  constructor(owner, class_name) {
    super(owner, class_name);
    Object.defineProperty(this, 'parents', {
      value: {}
    });

    const {md, doc, adapters} = this._owner.$p;

    adapters.pouch.once('pouch_data_loaded', () => {
      // загружаем предопределенные элементы
      this.job_prms();
      // информируем мир о готовности констант
      md.emit('predefined_elmnts_inited');
      // излучаем событие "можно открывать формы"
      adapters.pouch.emit('pouch_complete_loaded');
    });
  }

  /**
   * этот метод адаптер вызывает перед загрузкой doc_ram
   */
  job_prms() {

    // создаём константы из alatable
    this.forEach((row) => this.job_prm(row));

    // дополним автовычисляемыми свойствами
    // const {job_prm: {properties}} = this._owner.$p;
  }

  /**
   * создаёт константу
   * @param row
   */
  job_prm(row) {
    const {job_prm, md, utils} = this._owner.$p;
    const {parents} = this;
    const parent = job_prm[parents[row.parent.valueOf()]];
    const _mgr = row.type.is_ref && md.mgr_by_class_name(row.type.types[0]);

    if(parent) {
      if(parent.synonym === 'lists' || !row.synonym) {
        return;
      }
      if(parent.hasOwnProperty(row.synonym)) {
        delete parent[row.synonym];
      }

      if(row.list == -1) {
        parent.__define(row.synonym, {
          value: (() => {
            const res = {};
            (row.elmnts._obj || row.elmnts).forEach(({elm, value}) => {
              if(elm !== undefined) {
                res[elm.valueOf()] = _mgr ? _mgr.get(value, false, false) : value;
              }
            });
            return res;
          })(),
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
      else if(row.list) {
        parent.__define(row.synonym, {
          value: (row.elmnts._obj || row.elmnts).map((row) => {
            if(_mgr) {
              const value = _mgr.get(row.value, false, false);
              if(!utils.is_empty_guid(row.elm)) {
                value._formula = row.elm;
              }
              return value;
            }
            else {
              return row.value;
            }
          }),
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
      else if(row.predefined_name === 'abonent') {
        const {by_ref} = this;
        row.elmnts.forEach((row) => {
          const property = by_ref[row.property];
          if(!property || !property.predefined_name) return;
          const _mgr = property.type.is_ref && md.mgr_by_class_name(property.type.types[0]);
          parent.__define(property.predefined_name, {
            value: _mgr ? _mgr.get(row.value, false, false) : row.value,
            configurable: true,
            enumerable: true,
            writable: true,
          });
        });
      }
      else {
        parent.__define(row.synonym, {
          value: _mgr ? _mgr.get(row.value, false, false) : row.value,
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
    }
    else {
      $p.record_log({
        class: 'error',
        note: `no parent for ${row.synonym}`,
      });
    }
  }

  /**
   * переопределяем load_array
   * @param aattr {Array.<Object>}
   * @param [forse] {Boolean}
   * @override
   */
  load_array(aattr, forse) {
    const {job_prm} = this._owner.$p;
    const {parents} = this;
    const elmnts = [];
    for (const row of aattr) {
      // если элемент является папкой, создаём раздел в job_prm
      if(row.is_folder && row.synonym) {
        parents[row.ref] = row.synonym;
        !job_prm[row.synonym] && job_prm.__define(row.synonym, {value: {}});
      }
      // если не задан синоним - пропускаем
      else if(row.synonym) {
        const parent = parents[row.parent];
        // если есть подходящая папка, стразу делаем константу
        if(parent && parent.synonym !== 'lists') {
          !job_prm[parents[row.parent]][row.synonym] && this.job_prm(row);
        }
        // если папки нет - сохраним элемент в alatable
        else {
          elmnts.push(row);
        }
      }
      else {
        elmnts.push(row);
      }
    }
    // метод по умолчанию
    elmnts.length && super.load_array(elmnts, forse);
  }

};

exports.CchPredefined_elmnts = class CchPredefined_elmnts extends Object {
  get value() {
    const {_obj, type, _manager} = this;
    const {utils} = _manager._owner.$p;
    const res = _obj ? _obj.value : '';

    if(_obj.is_folder) {
      return '';
    }
    if(typeof res == 'object') {
      return res;
    }
    else if(type.is_ref) {
      if(type.digits && typeof res === 'number') {
        return res;
      }
      if(type.hasOwnProperty('str_len') && !utils.is_guid(res)) {
        return res;
      }
      const mgr = _manager.value_mgr(_obj, 'value', type);
      if(mgr) {
        if(utils.is_data_mgr(mgr)) {
          return mgr.get(res, false);
        }
        else {
          return utils.fetch_type(res, mgr);
        }
      }
      if(res) {
        _manager._owner.$p.record_log(['value', type, _obj]);
        return null;
      }
    }
    else if(type.date_part) {
      return utils.fix_date(_obj.value, true);
    }
    else if(type.digits) {
      return utils.fix_number(_obj.value, !type.hasOwnProperty('str_len'));
    }
    else if(type.types[0] == 'boolean') {
      return utils.fix_boolean(_obj.value);
    }
    else {
      return _obj.value || '';
    }

    return this.characteristic.clr;
  }
  set value(v) {
    const {_obj, _data, _manager} = this;
    if(_obj.value !== v) {
      _manager.emit_async('update', this, {value: _obj.value});
      _obj.value = v.valueOf();
      _data._modified = true;
    }
  }
  get definition(){return this._getter('definition')}
  set definition(v){this._setter('definition',v)}
  get synonym(){return this._getter('synonym')}
  set synonym(v){this._setter('synonym',v)}
  get list(){return this._getter('list')}
  set list(v){this._setter('list',v)}
  get predefined_name(){return this._getter('predefined_name')}
  set predefined_name(v){this._setter('predefined_name',v)}
  get parent(){return this._getter('parent')}
  set parent(v){this._setter('parent',v)}
  get type(){const {type} = this._obj; return typeof type === 'object' ? type : {types: []}}
  set type(v){this._obj.type = typeof v === 'object' ? v : {types: []}}
  get elmnts(){return this._getter_ts('elmnts')}
  set elmnts(v){this._setter_ts('elmnts',v)}
};
exports.CchPredefined_elmnts._replace = true;
