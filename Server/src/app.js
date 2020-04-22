/**
 * SERVER BOOTSTRAP FILE.
 * STARTS THE EXPRESS SERVER AND CONNECTS THE SERVER TO MONGODB
 * AUTHOR: @SINCLAIRE_7GPS_2020
 */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./dbConfig/dbConfig");
const paymentRoutes = require("./appRoutes/payment.routes");
const reportRoutes = require("./appRoutes/report.routes");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const port = process.env.PORT || 5000;
const dbUrl =
  "mongodb+srv://sinclaire7gps:sinclaire@7gps2020@applicationtestcluster-eufnf.mongodb.net/SevenPay?retryWrites=true&w=majority";

// Restreaming the request body to the proxy middleware
const restream = function (proxyReq, req, res, options) {
  if (req.body) {
    console.log("Logging body here");
    console.log(req.url);
    console.log(req.headers);
    let bodyData = JSON.stringify(req.body);
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    // streaming the content
    console.log("Got here");
    console.log(bodyData);
    proxyReq.write(bodyData);
  }
};

// create the route to be proxied and bind the middleware to the route
const paymentsProxy = createProxyMiddleware("/payments", {
  target: "http://192.168.100.10/payments",
  onProxyReq: restream,
  changeOrigin: true,
  secure: false,
});

// Calling all the application middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(paymentsProxy);
app.use("/sevenpay/payment", paymentRoutes);
app.use("/sevenpay/report", reportRoutes);

// Connecting to the database by calling the config file
dbConfig.dbConfig(dbUrl);

// Listen to connections on the server
app.listen(port, () => {
  console.log("App started on port " + port);
});

/** FINDOUT ABOUT THIS CLUSTER. I can't just lose it  */
// "mongodb+srv://sinclaire7gps:heisdearjesus71996@app-test-cluster-w46k9.mongodb.net/test?retryWrites=true&w=majority";
