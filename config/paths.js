'use strict';

const path = require('path');

module.exports = {
  appBuild: path.resolve(__dirname, "../build"),
  lib: path.resolve(__dirname, "../lib"),
  public(req) {
    const {pathname} = req.parsed;
    return (pathname.includes('images/') || pathname.includes('apidocs/')) ? this.lib : this.appBuild;
  },
};
