
/*
 * Подмешивается в конец init-файла
 *
 */

/**
 * Абстрактная строка табчасти параметров
 * @class
 */
class ParamsRow extends TabularSectionRow{
  get param(){
    return this._getter('param') || $p.cch.properties.get();
  }
  set param(v){this._setter('param',v)}
  get value(){
    const {param} = this;
    return (param && param.fetch_type && !param.empty()) ? param.fetch_type(this._obj.value) : this._getter('value');
  }
  set value(v){
    if(typeof v === 'string' && v.length === 72 && this.param.type?.types?.includes('cat.clrs')) {
      v = $p.cat.clrs.getter(v);
    }
    this._setter('value',v);
  }
}

/**
 * Строка табчасти параметров с признаком сокрытия
 * @class
 */
class HideParamsRow extends ParamsRow{
  get hide(){return this._getter('hide')}
  set hide(v){this._setter('hide',v)}
}

/**
 * Строка табчасти допреквизитов
 * @class
 */
class Extra_fieldsRow extends TabularSectionRow{
  get property(){return this._getter('property')}
  set property(v){this._setter('property',v)}
  get value(){
    const {property: param} = this;
    return (param && param.fetch_type && !param.empty()) ? param.fetch_type(this._obj.value) : this._getter('value');
  }
  set value(v) {
    if(typeof v === 'string' && v.length === 72 && this.property?.type?.types?.includes('cat.clrs')) {
      v = $p.cat.clrs.getter(v);
    }
    this._setter('value', v);
  }
  get txt_row(){return this._getter('txt_row')}
  set txt_row(v){this._setter('txt_row',v)}
}

/**
 * Строка допреквизитов ключей параметров
 * @class
 */
class CatParameters_keysParamsRow extends Extra_fieldsRow{
  get area(){return this._getter('area')}
  set area(v){this._setter('area',v)}
  get origin(){return this._getter('origin')}
  set origin(v){this._setter('origin',v)}
  get comparison_type(){return this._getter('comparison_type')}
  set comparison_type(v){this._setter('comparison_type',v)}
}


/**
 * Строка табчасти параметров формул
 * @class
 */
class CatFormulasParamsRow extends ParamsRow{}



Object.assign($p, {
  Extra_fieldsRow,
  CatFormulasParamsRow,
  CatParameters_keysParamsRow,
});

