"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var os_1 = require("os");
// Constants
var PORT = 8080;
var HOST = "0.0.0.0";
var osInfo = "OS: " + os_1.default.type() + " Release: " + os_1.default.release() + " HostName: " + os_1.default.hostname();
// App
var app = express_1.default();
app.get("/", function (_req, res) {
    res.send("<div>Hello from a windows container!</br>" + osInfo + "</div>");
});
app.listen(PORT, HOST);
console.log(osInfo);
console.log("Running on http://" + HOST + ":" + PORT);
