const PORT = 3484;									

var http = require('http');
var express = require('express');						
var socketio = require('socket.io')				

//var ip = require('ip');
var app = express();									
var server = http.Server(app)

var io = socketio(server);							
//Tạo namespace để phân biêt SocketClient trên Esp và webapp
var webapp_nsp = io.of('/webapp')			
var esp8266_nsp = io.of('/esp8266')				

var middleware = require('socketio-wildcard')();	//Để có thể bắt toàn bộ lệnh!
esp8266_nsp.use(middleware);						//Khi esp8266 emit bất kỳ lệnh gì lên thì sẽ bị bắt
webapp_nsp.use(middleware);							//Khi webapp emit bất kỳ lệnh gì lên thì sẽ bị bắt

server.listen(PORT);										// Cho socket server (chương trình mạng) lắng nghe ở port 3484

//Cài đặt webapp các fie dữ liệu tĩnh
app.use(express.static("node_modules/mobile-angular-ui")) 		
app.use(express.static("node_modules/angular")) 							
app.use(express.static("node_modules/angular-route")) 				
app.use(express.static("node_modules/socket.io-client")) 
app.use(express.static("node_modules/angular-socket-io"))			


//giải nén chuỗi JSON thành các OBJECT
function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}


//Bắt các sự kiện từ esp8266 gửi lên -> gửi toàn bộ dữ liệu cho webapp
esp8266_nsp.on('connection', function(socket) {
	console.log('esp8266 connected')
	
	socket.on('disconnect', function() {
		console.log("Disconnect socket esp8266")
	})
	

	socket.on("*", function(packet) {
		console.log("esp8266 rev and send to webapp packet: ", packet.data)

		var eventName = packet.data[0]
		var eventJson = packet.data[1] || {} //nếu gửi thêm json thì lấy json từ lệnh gửi, không thì gửi chuỗi json rỗng, {}
		//console.log("Name: " + eventName + ", Json: " + eventJson);
		webapp_nsp.emit(eventName, eventJson) //gửi toàn bộ lệnh + json đến webapp
	})
})

//Bắt các sự kiện từ webapp -> gửi toàn bộ dữ liệu xuống esp8266

webapp_nsp.on('connection', function(socket) {
	
	console.log('webapp connected')
	

	socket.on('disconnect', function() {
		console.log("Disconnect socket webapp")
	})
	
	socket.on('*', function(packet) {
		console.log("webapp rev and send to esp8266 packet: ", packet.data) //in ra để debug
		var eventName = packet.data[0]
		var eventJson = packet.data[1] || {} //nếu gửi thêm json thì lấy json từ lệnh gửi, không thì gửi chuỗi json rỗng, {}
		esp8266_nsp.emit(eventName, eventJson) //gửi toàn bộ lệnh + json đến esp8266
	});
})