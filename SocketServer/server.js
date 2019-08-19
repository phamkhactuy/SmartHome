//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var A=0;
io.on('connection', function (socket){
   console.log('connection');
	A=0;
	console.log('start:'+A);
  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
	socket.emit('CH02', 'me', 'push lai:'+A);
  });
  
  setInterval(() => {
	  A=Math.floor(Math.random() * 6) + 1 ;
      console.log('random:'+A);
	}, 2000);
  
  
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});