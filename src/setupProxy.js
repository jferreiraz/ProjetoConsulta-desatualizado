// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'localhost:8000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1/empresas/'
      }
    })
  );
};
