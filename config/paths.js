'use strict';

const path = require('path');

module.exports = {
  appBuild: path.resolve(__dirname, "../build"),
  imgStories: path.resolve(__dirname, "../lib"),
  public(req) {
    return req.parsed.pathname.includes('images/') ? this.imgStories : this.appBuild;
  },
};
