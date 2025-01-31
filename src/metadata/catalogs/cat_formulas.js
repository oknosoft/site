/**
 *
 * &copy; Evgeniy Malyarov http://www.oknosoft.ru 2014-2018
 *
 * Created 17.04.2016
 *
 * @module cat_formulas
 *
 */

exports.CatFormulasManager = class CatFormulasManager extends Object {

  constructor(owner, class_name) {
    super(owner, class_name);
    this._owner.$p.adapters.pouch.once('pouch_data_loaded', () => this.load_formulas.bind(this));
  }

  load_formulas(src) {
    const {md, utils, wsql} = $p;
    const {isNode, isBrowser} = wsql.alasql.utils;
    const parents = [this.predefined('printing_plates'), this.predefined('modifiers')];
    const filtered = [];
    (src || this).forEach((v) => {
      if(!v.disabled && parents.includes(v.parent)){
        if(v.context === 1 && !isBrowser || v.context === 2 && !isNode) {
          return;
        }
        filtered.push(v);
      }
    });

    const compare = utils.sort('name');

    filtered.sort(utils.sort('sorting_field')).forEach((formula) => {
      // формируем списки печатных форм и внешних обработок
      if(formula.parent == parents[0]) {
        formula.params.find_rows({param: 'destination'}, (dest) => {
          const dmgr = md.mgr_by_class_name(dest.value);
          if(dmgr) {
            const tmp = dmgr._printing_plates ? Object.values(dmgr._printing_plates) : [];
            tmp.push(formula);
            tmp.sort(compare);
            dmgr._printing_plates = {};
            for(const elm of tmp) {
              dmgr._printing_plates[`prn_${elm.ref}`] = elm;
            }
          }
        });
      }
      else {
        // выполняем модификаторы
        try {
          const res = formula.execute();
          // еслм модификатор вернул задание кроносу - добавляем планировщик
          res && utils.cron && utils.cron(res);
        }
        catch (err) {
        }
      }
    });
  }

  // переопределяем load_array - не грузим неактивные формулы
  load_array(aattr, forse) {
    const res = super.load_array(aattr.filter((v) => !v.disabled || v.is_folder), forse);
    const modifiers = this.predefined('modifiers');
    for(const doc of res) {
      const {_data, parent} = doc;
      if(_data._formula) {
        _data._formula = null;
        if(parent === modifiers) {
          $p.record_log(`runtime modifier '${doc.name}'`);
        }
      }
      if(_data._template) {
        _data._template = null;
      }
    }
  }

};

exports.CatFormulas = class CatFormulas extends Object {

  execute(obj, attr) {

    const {_manager, _data, ref} = this;
    const {$p} = _manager._owner;
    const {ireg, msg, ui} = $p;

    // создаём функцию из текста формулы
    if(!_data._formula && this.formula){
      try{
        if(this.jsx) {
          _data._formula = new Function('$p', this.formula)($p);
        }
        else {
          if(this.async) {
            const AsyncFunction = Object.getPrototypeOf(eval('(async function(){})')).constructor;
            _data._formula = (new AsyncFunction('obj,$p,attr', this.formula)).bind(this);
          }
          else {
            _data._formula = (new Function('obj,$p,attr', this.formula)).bind(this);
          }
        }
      }
      catch(err){
        _data._formula = () => false;
        $p.record_log(err);
      }
    }

    const {_formula} = _data;

    if(this.parent == _manager.predefined('printing_plates')) {

      if(!_formula) {
        msg.show_msg({
          title: msg.bld_title,
          type: 'alert-error',
          text: `Ошибка в формуле<br /><b>${this.name}</b>`
        });
        return Promise.resolve();
      }

      // рендерим jsx в новое окно
      if(this.jsx) {
        return ui.dialogs.window({
          Component: _formula,
          title: this.name,
          //print: true,
          obj,
          attr,
        });
      }

      // получаем HTMLDivElement с отчетом
      ireg.log?.timeStart?.(ref);
      return _formula(obj, $p, attr)

      // показываем отчет в отдельном окне
        .then((doc) => {
          ireg.log?.timeEnd?.(ref);
          $p.SpreadsheetDocument && doc instanceof $p.SpreadsheetDocument && doc.print();
        })
        .catch(err => {
          ireg.log?.timeEnd?.(ref, err);
          throw err;
        });

    }
    else {
      ireg.log?.timeStart?.(ref);
      const res = _formula && _formula(obj, $p, attr);
      ireg.log?.timeEnd?.(ref);
      return res;
    }
  }

  get _template() {
    const {_data, _manager} = this;
    if(!_data._template){
      const {SpreadsheetDocument} = _manager._owner.$p;
      if(SpreadsheetDocument) {
        _data._template = new SpreadsheetDocument(this.template);
      }
    }
    return _data._template;
  }

};
