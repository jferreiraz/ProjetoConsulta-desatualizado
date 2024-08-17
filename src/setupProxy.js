// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://teste.empresas.io',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1/empresas/'
      }
    })
  );
};
