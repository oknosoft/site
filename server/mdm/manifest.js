/**
 * Добавляет заголовок с числом элементов справочников
 *
 * @module manifest
 *
 * Created by Evgeniy Malyarov on 06.10.2019.
 */

const {resolve} = require('path');
const {readFile} = require('node:fs/promises');

module.exports = async function manifest({res, zone, suffix, by_branch, common}) {
  const path1 = resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}/manifest.json`);
  const m1 = JSON.parse(await readFile(path1, 'utf8'));
  const m2 = (suffix === 'common' || suffix === '0000') ? m1 : JSON.parse(
    await readFile(resolve(__dirname, `./cache/${zone}/0000/manifest.json`), 'utf8'));
  let m;
  if(suffix === 'common') {
    m = common.map((name) => {
      return {[name]: (m2[name] ? m2[name].count : 0)};
    });
  }
  else {
    m = Object.keys(m2)
      .filter((name) => !common.includes(name))
      .map((name) => {
        return {[name]: by_branch.includes(name) ? (m1[name] ? m1[name].count : 0) : (m2[name] ? m2[name].count : 0)};
      });
  }
  res.setHeader('manifest', JSON.stringify(m));
};
