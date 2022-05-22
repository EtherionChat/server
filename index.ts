require("dotenv").config();
import * as moduleAlias from "module-alias";
moduleAlias.addAliases({
  "@config": __dirname + "/config",
  "@apis": __dirname + "/apis",
  "@utils": __dirname + "/utils",
  "@types": __dirname + "/types",
  "@exceptions": __dirname + "/exceptions",
  "@middlewares": __dirname + "/middlewares",
  "@controllers": __dirname + "/controllers",
  "@models": __dirname + "/models",
  "@routes": __dirname + "/routes",
  "@services": __dirname + "/services",
  "@validators": __dirname + "/validators",
  "@middlewares": __dirname + "/middlewares",
  "@controllers": __dirname + "/controllers",
  "@models": __dirname + "/models",
  "@routes": __dirname + "/routes",
  "@services": __dirname + "/services",
  "@validators": __dirname + "/validators",
  "@middlewares": __dirname + "/middlewares",
  "@controllers": __dirname + "/controllers",
});
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);

const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { lookup } = require('geoip-lite');
const requestIp = require('request-ip');
const app = express();

const port = 5000;

// Logging
app.use(morgan("dev"));

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(ip); // ip address of the user
  console.log(lookup(ip));
  res.send(lookup(requestIp.getClientIp(req)));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
