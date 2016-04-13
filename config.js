var fs = require('fs');
var config = JSON.parse(fs.readFileSync('.\\config.json', 'utf8'));

if (typeof process.env.PORT == 'undefined') 
    process.env.PORT = config.AuthJSSettings.port;

config.rootUrl = "http://"+config.WebAppSettings.hostname+':'+ process.env.PORT + '/';
config.buttonGeneratorPageUrl = "http://" + config.WebAppSettings.hostname + ':' + config.WebAppSettings.port + '/' + "Auth.JS/aspx/AllInOne.aspx";

module.exports = config;
