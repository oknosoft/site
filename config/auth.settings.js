/**
 *
 *
 * @module auth.settings
 *
 * Created by Evgeniy Malyarov on 13.06.2019.
 */

const lsprefix = `/${process.env.LSPREFIX || 'www_'}`;

module.exports = {
  providers: ['couchdb'],
  couchdb: {
    url: process.env.COUCHLOCAL ? process.env.COUCHLOCAL.replace(lsprefix, '/_session') : 'http://cou221:5984/_session',
    authPrefix: 'Basic ',
  },
}
