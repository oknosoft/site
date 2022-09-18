/**
 * рендерит sitemap.xml
 *
 * @module sitemap
 *
 * Created by Evgeniy Malyarov on 05.09.2018.
 */

const xml = require('fs').readFileSync(require.resolve('./sitemap.xml'), 'utf8');
const su = process.env.SERVER_URL;

function row(doc) {
  const {id, date} = doc;
  return `<url>
    <loc>${su}/${id}</loc>
    <lastmod>${date.toISOString().split('T')[0]}</lastmod>
</url>`;
}

module.exports = function (req, res, articles, log) {
  let rows = '';
  // бежим по всем статьям
  for(const doc of articles) {
    if(doc.published && doc.acl.find({role: '_anonymous'})){
      rows += row(doc);
    }
  }
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.end(xml.replace('</urlset>', `${rows}\n</urlset>`));
  return true;
};
