
exports.CatTags_category = class CatTags_category extends Object {

  get att_allowed() {
    const {_manager} = this;
    return this === _manager.predefined('article') || this === _manager.predefined('file');
  }
}
