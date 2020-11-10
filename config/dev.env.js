"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8849"',
  OSS_PATH: '"https://online-movie.oss-cn-chengdu.aliyuncs.com"'
});
