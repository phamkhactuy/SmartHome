const PORT = 3484;	
var http = require('http') 							//#include thư viện http - Tìm thêm về từ khóa http nodejs trên google nếu bạn muốn tìm hiểu thêm. Nhưng theo kinh nghiệm của mình, Javascript trong môi trường NodeJS cực kỳ rộng lớn, khi bạn bí thì nên tìm hiểu không nên ngồi đọc và cố gắng học thuộc hết cái reference (Tài liêu tham khảo) của nodejs làm gì. Vỡ não đó!
var socketio = require('socket.io')				//#include thư viện socketio
 
var ip = require('ip');
var app = http.createServer();					//#Khởi tạo một chương trình mạng (app)
var io = socketio(app);								//#Phải khởi tạo io sau khi tạo app!
app.listen(PORT);										// Cho socket server (chương trình mạng) lắng nghe ở port 3484


console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
 function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
var trangtraiden="";
var led = [true, false]
var json = {
			"led": led //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
		}
//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
io.on('connection', function(socket) {	
	//hàm console.log giống như hàm Serial.println trên Arduino
    console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.
	
	//Tạo một chu kỳ nhiệm vụ sẽ chạy lại sau mỗi 200ms
	var interval1 = setInterval(function() {
		json = {
			"led": led //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
		}
		socket.emit('LED', json) //Gửi lệnh LED với các tham số của của chuỗi JSON
	}, 2000)//200ms
	
	
	socket.on('CHON', function (from, msg) {
		console.log('MSG', from, ' saying ', msg);
		led[0]=true;
		/*json = {
			"led": led //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
		}
		socket.emit('LED', json)*/
		});
	socket.on('CHOFF', function (from, msg) {
		console.log('MSG', from, ' saying ', msg);
		led[0]=false;
		/*json = {
			"led": led //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
		}
		socket.emit('LED', json)*/
		});
	socket.on('CH01', function (from, msg) {
		console.log('MSG', from, ' saying ', msg);
		socket.emit('CH02', 'me', trangtraiden);
		});
	
	socket.on('atime', function(data) {
        console.log("Trang thai den hien tai: "+data["message"])
		trangtraiden=data["message"];
    });
	
	//Khi socket client bị mất kết nối thì chạy hàm sau.
	socket.on('disconnect', function() {
		console.log("disconnect") 	//in ra màn hình console cho vui
		clearInterval(interval1)		//xóa chu kỳ nhiệm vụ đi, chứ không xóa là cái task kia cứ chạy mãi thôi đó!
	})
});
	