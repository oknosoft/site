const handler = require('serve-handler');
// const compression = require('compression');
// const {promisify} = require('util');
// const compressionHandler = promisify(compression());

const paths = require('../../config/paths');

module.exports = async (req, res) => {
  //await compressionHandler(req, res);
  return await handler(req, res, {
    cleanUrls: true,
    'public': paths.appBuild,
    headers: [
      {
        source: 'service-worker.js',
        headers: [{
          key: 'Service-Worker-Allowed',
          value: '/'
        }]
      }
    ],
    rewrites: [
      {source: 'doc.**', destination: '/index.html'},
    ]
  });
};
