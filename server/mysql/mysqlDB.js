var mysql  = require('mysql');
var setting = require('./setting')
module.exports = mysql.createConnection(setting)