/**
 * упрощенный рендер статьи
 */

const {resolve} = require('path');
const {appBuild} = require('../../config/paths');
const {readFile} = require('node:fs/promises');
const marked = require('../../lib/marked.cjs');
const slashRegex = /(\.html|\.html\?[\s\S]+?|\/)$/;

const cache = {
  title: 'Окнософт',
  description: require('./description'),
  cprefix: '/couchdb/www_0_ram/cat.articles|',
  async load(file = 'index') {
    const html = this[file];
    if(html) {
      return html;
    }
    try {
      this[file] = await readFile(resolve(file === 'index' ? appBuild : __dirname, `${file}.html`), 'utf8');
    }
    catch (e) {}
    return this[file];
  },
  su: process.env.SERVER_URL,
};

module.exports = async (req, res, articles, log) => {
  let {query, path} = req.parsed;
  path = path.replace(/^\//, '');
  const slash = slashRegex.test(path);
  if(slash) {
    path = path.replace(slashRegex, '');
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
  else if(!path || path.startsWith('index')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(await fill());
    return true;
  }
  else {
    // если статья не найдена
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(await fill('404'));
  }
  return true;
};

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
      `<title>${title}</title>`)
      .replace(
      `<meta property="og:title" content="${cache.title}" data-react-helmet="true">`,
      `<meta property="og:title" content="${title}" data-react-helmet="true">`)
      .replace(
      `<meta name="description" content="${cache.description}" data-react-helmet="true">`,
      `<meta name="description" content="${descr}" data-react-helmet="true">`)
      .replace(
      `<meta property="og:description" content="${cache.description}" data-react-helmet="true">`,
      `<meta property="og:description" content="${descr}" data-react-helmet="true">`)
      .replace(`content="article">`, `content="article">${doc.head}`)
      .replace(
      `<div id="root"></div>`,
      `<div id="root"><div style="max-width: 960px; padding: 48px 8px; margin: auto; color: #777;">
<h1>${doc.h1 || doc.name}</h1>
${marked.parse(
        (doc.content || '')
          .replace(/<ssr/gm, `<div`)
          .replace(/ssr>/gm, `div>`)
          .replace(/!\[image]\(this/gm, `![image](${cache.cprefix}${doc.ref}`)
          .replace(/src="this\//gm, `src="${cache.cprefix}${doc.ref}/`)
          .replace(/~\//gm, `${cache.cprefix}${doc.ref}/`)
          .replace(/({<.*?>})/gm, ''),
      )}
${doc.category.is('contents') ? doc.articles
        .map(({paper}) => `<a href="/${paper.id}" style="display: list-item;">${paper.name}</a>`)
        .join('\n') : ''}</div></div>`);

    if(doc.img) {
      html = html.replace(`${cache.su}/imgs/flask_192.png`, doc.img.replace('~/', `${cache.cprefix}${doc.ref}/`));
    }
  }
  return html;
}
