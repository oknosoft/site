/**
 * ### Дополнительные методы справочника _Статьи_
 *
 * @module cat_articles
 *
 * Created by Evgeniy Malyarov on 20.04.2018.
 */

//import EditorArticle from '../../components/Articles/Editor';

exports.CatArticlesManager = class CatArticlesManager extends Object {

  constructor(owner, class_name) {
    super(owner, class_name);
    this._aliases = {};
    this._tags = new Map();
  }

  // реквизит поиска по строке
  build_search(tmp, tObj) {
    tmp.search = (tObj.name + ' ' + tObj.id).toLowerCase();
  }

  load_array(aattr, forse) {
    const arr = super.load_array(aattr, forse);
    for(const o of arr) {
      this._aliases[o.id] = o;
      for(const {url} of o.aliases) {
        this._aliases[url] = o;
      }
      for(const {tag} of o.tags) {
        if(!this._tags.has(tag)) {
          this._tags.set(tag, []);
        }
        this._tags.get(tag).push(o);
      }
    }
    return arr;
  }
}
