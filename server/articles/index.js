/**
 * ### middleware
 * для смешанного рендеринга
 */


const sitemap = require('./sitemap');
const article = require('./article');

module.exports = function ({cat: {articles}}, log) {

  // вернём handler
  return async (req, res) => {
    let {path} = req.parsed;
    path = path.replace(/^\//, '');

    if(path.startsWith('sitemap.xml')) {
      return sitemap(req, res, articles, log);
    }

    return article(req, res, articles, log);
  };
};
