var http = require('http');
var fs = require('fs');
var express = require('express');
var app = require('./config/express')(app);
require('./config/passport')();
require('./config/database.js')('mongodb://localhost/lojamaster');

var server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log('Express Server escutando na porta ' + app.get('port'));
});