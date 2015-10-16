var path = require('path');
var express = require('express');

var app = express();
var io = require('socket.io')();

app.use(express.static(path.join(__dirname, '..', 'static')));
app.io = io;

var detected = false;
io.on('connection', function (socket) {
  setInterval(function () {
    detected = !detected;

    socket.emit('movement', {
      date: new Date(),
      detected: detected
    })
  }, 5000);
});

module.exports = app;
