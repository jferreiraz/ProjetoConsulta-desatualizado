// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.1.80:8000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1/empresas/'
      }
    })
  );
};
