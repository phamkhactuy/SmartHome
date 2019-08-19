angular.module('myApp', [
    'ngRoute',
    'mobile-angular-ui',
	'btford.socket-io'
]).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'Home'
    });
}).factory('mySocket', function (socketFactory) {
	var myIoSocket = io.connect('/webapp');	//Tên namespace webapp

	mySocket = socketFactory({
		ioSocket: myIoSocket
	});
	return mySocket;

/////////////////////// Những dòng code ở trên phần này là phần cài đặt, các bạn hãy đọc thêm về angularjs để hiểu, cái này không nhảy cóc được nha!
}).controller('Home', function($scope, mySocket) {
	////-- Khu cài đặt tham số 
	//dùng để đặt các giá trị mặc định
    $scope.fan_status = [1, 1,1];
	$scope.led_status = [1];
	$scope.voltage_value = [0,0,0];
	$scope.aptomat_value = [1];
	$scope.value = {};
	
	
	//action control fan
	$scope.onFanClick = function() {
		console.log("Button on control FAN clicked");
		var json = {
			"clicked": true
		}
		mySocket.emit("F_ON", true);
	};
	
	$scope.offFanClick = function() {
		
		var json = {
			"clicked": true
		}
		mySocket.emit("F_OFF", true);
	};
	//action control led
	$scope.ledClick = function() {
		
		var json = {
			"clicked": true
		}
		mySocket.emit("L_CHANGE", true);
	};
	//control AT
	$scope.atomatClick = function() {
		
		var json = {
			"clicked": true
		}
		mySocket.emit("AT_CHANGE", true);
	};
	
	//Nhận dữ liệu từ Arduno gửi lên (thông qua ESP8266 rồi socket server truyền tải!)
	//các sự kiện từ Arduino gửi lên (thông qua esp8266, thông qua server)
	mySocket.on('F_STATUS', function(json) {
		$scope.fan_status = json
	});
	
	mySocket.on('L_STATUS', function(json) {
		$scope.led_status = json
	});
	
	mySocket.on('V_VALUE', function(json) {
		$scope.voltage_value = json
	});
	
	mySocket.on('AT_STATUS', function(json) {
		$scope.aptomat_value = json
	});
	
	
	mySocket.on('THC_STATUS', function(json) {
		$scope.value = json
	});
	

	
	
	
	mySocket.on('connect', function() {
		console.log("connected webapp")
		////Cập nhập trạng thái LED, FAN, Atomat, Valtage
		mySocket.emit("FAN");
		mySocket.emit("LED");
		mySocket.emit("APTOMAT");
		mySocket.emit("VOLTAGE");
		mySocket.emit("T_H_C");
		
	});
	
		
});