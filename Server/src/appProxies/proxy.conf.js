/**
 * THIS MODULE IS NOT BEING USED FOR THE MEANTIME
 */
const { createProxyMiddleware } = require("http-proxy-middleware");
const restream = function (proxyReq, req, res, options) {
  if (req.body) {
    console.log("Logging body here");
    console.log(req.url);
    console.log(req.headers);
    let bodyData = JSON.stringify(req.body);
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    // stream the content
    console.log("Got here");
    console.log(bodyData);
    proxyReq.write(bodyData);
  }
};

module.exports = {
  paymentsProxy: () => {
    createProxyMiddleware("/payments", {
      target: "http://192.168.100.10/payments",
      onProxyReq: restream,
      changeOrigin: true,
      secure: false,
    });
  },
};
