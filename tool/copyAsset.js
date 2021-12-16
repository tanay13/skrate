"use strict";
exports.__esModule = true;
var shell = require("shelljs");
//Copy all the view Templates
shell.cp("-R", "src/views", "dist/src");
