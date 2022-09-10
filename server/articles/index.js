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
  html: '',
  time: 0,
  timeout: 600000,
  title: 'Окнософт',
  description: 'Сайт о решении проблем автоматизации и управления бизнесом. Заказы онлайн, Планирование и подготовка производства, Кальеклятор окон, CRM, Оптимизация раскроя стекла и профиля',
};

module.exports = function ({cat: {articles}}, log) {

  // вернём роутер
  return async (req, res) => {
    let {query, path, paths} = req.parsed;
    path = path.replace(/^\//, '')
    const slash = /(\.html|\/)$/.test(path);
    if(slash) {
      path = path.replace(/(\.html|\/)$/, '');
    }
    const article = articles._aliases[path];
    if(article) {
      if(path !== article.id || slash || query) {
        res.writeHead(301, {
          location: `/${article.id}`,
        });
        res.end();
        return true;
      }
      const html = await fill(article);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(html);
      return true;
    }
  }
}

async function index() {
  const {html, time, timeout} = cache;
  if(html && (time + timeout > Date.now())) {
    return html;
  }
  try {
    cache.html = await readFile(resolve(appBuild, `index.html`), 'utf8');
    cache.time = Date.now();
  }
  catch (e) {}
  return cache.html;
}

async function fill(doc) {
  let html = await index();
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

  return html;
}

