'use strict';

const path = require('path');

module.exports = {
  appBuild: path.resolve(__dirname, "../build"),
  lib: path.resolve(__dirname, "../lib"),
  public(req) {
    const {pathname} = req.parsed;
    if(pathname.includes('images/') || pathname.includes('apidocs/')) {
      return this.lib;
    }
    if(pathname.startsWith('/lib/')) {
      return this.lib.replace(/lib$/, '');
    }
    return this.appBuild;
  },
};
