/**
 * ### middleware
 * для смешанного рендеринга
 */

const https = require('https');
const marked = require('marked');
const sitemap = require('./sitemap');
const {resolve} = require('path');
const {appBuild} = require('../../config/paths');
const {readFile} = require('node:fs/promises');

const cache = {
  title: 'Окнософт',
  description: require('./description'),
  async load(file = 'index') {
    const html = this[file];
    if(html) {
      return html;
    }
    try {
      this[file] = await readFile(resolve(appBuild, `${file}.html`), 'utf8');
    }
    catch (e) {}
    return this[file];
  },
};

module.exports = function ({cat: {articles}}, log) {

  // вернём handler
  return async (req, res) => {
    let {query, path, paths} = req.parsed;
    path = path.replace(/^\//, '');

    if(!path || path.startsWith('index')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(await fill());
      return true;
    }

    const slash = /(\.html|\/)$/.test(path);
    if(slash) {
      path = path.replace(/(\.html|\/)$/, '');
    }
    const article = articles._aliases[path];
    if(article) {
      // если статья найдена, но кривой путь
      if(path !== article.id || slash || query) {
        res.writeHead(301, {location: `/${article.id}`});
        res.end();
      }
      // если статья найдена и запросили сырые данные
      else if(req.method === 'POST' || req.headers.accept === 'application/json') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(article));
      }
      else {
        // если статья найдена и запросили html
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(await fill(article));
      }
    }
    else {
      // если статья не найдена
      res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(await fill('404'));
    }
    return true;
  }
}

async function fill(doc) {
  let html = await cache.load();
  if(typeof doc === 'string') {
    html = html.replace(`<div id="root"></div>`, await cache.load(doc));
  }
  else if(!doc) {
    html = html.replace(`<div id="root"></div>`, await cache.load('home'));
  }
  else {
    const title = doc.name;
    const descr = doc.descr || doc.introduction;
    html = html.replace(
      `<title>${cache.title}</title>`,
      `<title>${title}</title>`);
    html = html.replace(
      `<meta property="og:title" content="${cache.title}" data-react-helmet="true">`,
      `<meta property="og:title" content="${title}" data-react-helmet="true">`);
    html = html.replace(
      `<meta name="description" content="${cache.description}" data-react-helmet="true">`,
      `<meta name="description" content="${descr}" data-react-helmet="true">`);
    html = html.replace(
      `<meta property="og:description" content="${cache.description}" data-react-helmet="true">`,
      `<meta property="og:description" content="${descr}" data-react-helmet="true">`);
    html = html.replace(
      `<div id="root"></div>`,
      `<div id="root"><div style="max-width: 960px; padding-top: 48px; margin: auto;">
<h1>${doc.h1 || doc.name}</h1>${marked.parse(doc.content || '')}</div></div>`);

    if(doc.img) {
      html = html.replace('https://oknosoft.ru/imgs/flask_192.png', doc.img);
    }
  }
  return html;
}

