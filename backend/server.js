const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/langflow-api",
  createProxyMiddleware({
    target: "https://astra.datastax.com",
    changeOrigin: true,
    pathRewrite: { "^/langflow-api": "" },
    onProxyRes: (proxyRes) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Authorization, Content-Type";
    },
  })
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
