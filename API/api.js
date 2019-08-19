 
// Set up the express app
//const app = require('express')();

const express = require('express');
var app = express();
app.use(express.json());
// get all todos
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3484', {reconnect: true});
var B=0;
app.get('/api/v1/todos', (req, res) => {

	socket.on('connect', function (socket) {
    console.log('Connected!');
	console.log(socket);
	});
	socket.emit('CH01', 'me', 'T1 test msg');
	//
	socket.on('CH02', function (from, msg) {
		console.log('Server ban ve:', from, ' saying ', msg);
		B=msg;
	});
  res.status(200).send({
    success: 'true',
    message: 'Kiem tra trang thai den hien tai',
    todos: B
  })
});

app.get('/api/listitem/', (req, res) => {
	console.log('goi ham list item');
  res.status(200).send({
    success: 'true',
    message: 'Danh sach thiet bi cua nha',
    data: [{idlayout:'L1'
				,namelayout:'Tầng 1'
				,listitem:[{iditem:'L1Q1'
								,typeitem:'QUAT'
								,nameitem:'Quạt trần phòng khách'}
							,{iditem:'L1D1'
								,typeitem:'DEN'
								,nameitem:'Đèn chùm phòng khách'}
							,{iditem:'L1D2'
								,typeitem:'DEN'
								,nameitem:'Đèn trần phòng khách'}
							,{iditem:'L1D3'
								,typeitem:'DEN'
								,nameitem:'Đèn tranh phòng khách'}
							,{iditem:'L1D4'
								,typeitem:'DEN'
								,nameitem:'Đèn trần phòng học'}
							,{iditem:'L1D5'
								,typeitem:'DEN'
								,nameitem:'Đèn chùm phòng học'}
							,{iditem:'L1D6'
								,typeitem:'DEN'
								,nameitem:'Đèn tranh phòng học'}
							,{iditem:'L1D7'
								,typeitem:'DEN'
								,nameitem:'Đèn cửa ngách'}
							,{iditem:'L1D8'
								,typeitem:'DEN'
								,nameitem:'Đèn WC'}	
							,{iditem:'L1B1'
								,typeitem:'BINHNONGLANH'
								,nameitem:'Bình nóng lạnh WC T1'}
							,{iditem:'L1D9'
								,typeitem:'DEN'
								,nameitem:'Đèn cầu thang T1'}
							,{iditem:'L1D10'
								,typeitem:'DEN'
								,nameitem:'Đèn sân T1'}
							,{iditem:'L1D11'
								,typeitem:'DEN'
								,nameitem:'Đèn 1 bếp'}
							,{iditem:'L1D12'
								,typeitem:'DEN'
								,nameitem:'Đèn 2 bếp'}
							,{iditem:'L1MV1'
								,typeitem:'MV'
								,nameitem:'Cảnh báo Move T1'}
							,{iditem:'L1C1'
								,typeitem:'CAM'
								,nameitem:'Camera T1'}
							,{iditem:'L1R1'
								,typeitem:'REM'
								,nameitem:'Rèm 1 phòng khách'}
							,{iditem:'L1R2'
								,typeitem:'REM'
								,nameitem:'Rèm 2 phòng khách'}
							,{iditem:'L1T1'
								,typeitem:'TT'
								,nameitem:'Trạng thái ban đêm'}
							,{iditem:'L1T2'
								,typeitem:'TT'
								,nameitem:'Trạng thái ban ngày'}
							,{iditem:'L1DH1'
								,typeitem:'DIEUHOA'
								,nameitem:'Điều hòa bếp'}
							,{iditem:'CB1'
								,typeitem:'CAMBIEN'
								,nameitem:'Nhiệt độ và độ ẩm bếp'}
							,{iditem:'CB2'
								,typeitem:'CAMBIEN'
								,nameitem:'Khí CO bếp'}
							,{iditem:'AT1'
								,typeitem:'ATOMAT'
								,nameitem:'Atomat bếp'}
							,{iditem:'CB3'
								,typeitem:'CAMBIEN'
								,nameitem:'dòng điện Bếp'}
							,{iditem:'CB4'
								,typeitem:'CAMBIEN'
								,nameitem:'Công suất điện tổng'}
							,{iditem:'AT2'
								,typeitem:'ATOMAT'
								,nameitem:'Atomat tổng'}
							,{iditem:'CB5'
								,typeitem:'CAMBIEN'
								,nameitem:'dòng điện tổng'}
								]}
			,{idlayout:'L2'
				,namelayout:'Tầng 2'
				,listitem:[{iditem:'L2Q1'
								,typeitem:'QUAT'
								,nameitem:'Quạt phòng 1'}
							,{iditem:'L2D1'
								,typeitem:'DEN'
								,nameitem:'Đèn 1 phòng 1'}
							,{iditem:'L2D2'
								,typeitem:'DEN'
								,nameitem:'Đèn 2 phòng 1'}
							,{iditem:'L2D3'
								,typeitem:'DEN'
								,nameitem:'Đèn 3 phòng 1'}
							,{iditem:'L2DH1'
								,typeitem:'DIEUHOA'
								,nameitem:'Điều hòa phòng 1'}
							,{iditem:'L2Q2'
								,typeitem:'QUAT'
								,nameitem:'Quạt phòng 2'}
							,{iditem:'L2D4'
								,typeitem:'DEN'
								,nameitem:'Đèn 1 phòng 2'}
							,{iditem:'L2D5'
								,typeitem:'DEN'
								,nameitem:'Đèn 2 phòng 2'}
							,{iditem:'L2D6'
								,typeitem:'DEN'
								,nameitem:'Đèn 3 phòng 2'}
							,{iditem:'L2DH2'
								,typeitem:'DIEUHOA'
								,nameitem:'Điều hòa phòng 2'}
							,{iditem:'L2D7'
								,typeitem:'DEN'
								,nameitem:'Đèn WC T2'}	
							,{iditem:'L2B1'
								,typeitem:'BINHNONGLANH'
								,nameitem:'Bình nóng lạnh WC T2'}
							,{iditem:'L2D8'
								,typeitem:'DEN'
								,nameitem:'Đèn cầu thang T2'}
							,{iditem:'L2D9'
								,typeitem:'DEN'
								,nameitem:'Đèn sân T2'}
							,{iditem:'L2MV1'
								,typeitem:'MV'
								,nameitem:'Cảnh báo Move T2'}
							,{iditem:'L2C1'
								,typeitem:'CAM'
								,nameitem:'Camera 1 T2'}
							,{iditem:'L2C2'
								,typeitem:'CAM'
								,nameitem:'Camera 2 T2'}
							,{iditem:'L2R1'
								,typeitem:'REM'
								,nameitem:'Rèm 1 phòng 1'}
							,{iditem:'L2R2'
								,typeitem:'REM'
								,nameitem:'Rèm 1 phòng 2'}
							,{iditem:'L2T1'
								,typeitem:'TT'
								,nameitem:'Trạng thái ban đêm'}
							,{iditem:'L2T2'
								,typeitem:'TT'
								,nameitem:'Trạng thái ban ngày'}
							,{iditem:'L3T2'
								,typeitem:'TT'
								,nameitem:'Trạng thái ban ngày'}
							,{iditem:'CB1'
								,typeitem:'CAMBIEN'
								,nameitem:'Nhiệt độ và độ ẩm bếp'}
							,{iditem:'CB2'
								,typeitem:'CAMBIEN'
								,nameitem:'Khí CO bếp'}
							,{iditem:'AT1'
								,typeitem:'ATOMAT'
								,nameitem:'Atomat bếp'}
							,{iditem:'CB3'
								,typeitem:'CAMBIEN'
								,nameitem:'dòng điện Bếp'}
							,{iditem:'CB4'
								,typeitem:'CAMBIEN'
								,nameitem:'Công suất điện tổng'}
							,{iditem:'AT2'
								,typeitem:'ATOMAT'
								,nameitem:'Atomat tổng'}
							,{iditem:'CB5'
								,typeitem:'CAMBIEN'
								,nameitem:'dòng điện tổng'}
								]}
				,{idlayout:'L3'
					,namelayout:'Tầng 3'
					,listitem:[{iditem:'L3Q1'
								,typeitem:'QUAT'
								,nameitem:'Quạt phòng 1'}
							,{iditem:'L3D1'
								,typeitem:'DEN'
								,nameitem:'Đèn 1 phòng 1'}
							,{iditem:'L3D2'
								,typeitem:'DEN'
								,nameitem:'Đèn 2 phòng 1'}
							,{iditem:'L3D3'
								,typeitem:'DEN'
								,nameitem:'Đèn 3 phòng 1'}
							,{iditem:'L3DH1'
								,typeitem:'DIEUHOA'
								,nameitem:'Điều hòa phòng 1'}
							,{iditem:'L3Q2'
								,typeitem:'QUAT'
								,nameitem:'Quạt phòng 2'}
							,{iditem:'L3D4'
								,typeitem:'DEN'
								,nameitem:'Đèn 1 phòng 2'}
							,{iditem:'L3D5'
								,typeitem:'DEN'
								,nameitem:'Đèn 2 phòng 2'}
							,{iditem:'L3D6'
								,typeitem:'DEN'
								,nameitem:'Đèn 3 phòng 2'}
							,{iditem:'L3DH2'
								,typeitem:'DIEUHOA'
								,nameitem:'Điều hòa phòng 2'}
							,{iditem:'L3D7'
								,typeitem:'DEN'
								,nameitem:'Đèn WC T3'}	
							,{iditem:'L3B1'
								,typeitem:'BINHNONGLANH'
								,nameitem:'Bình nóng lạnh WC T3'}
							,{iditem:'L3D8'
								,typeitem:'DEN'
								,nameitem:'Đèn cầu thang T3'}
							,{iditem:'L3D9'
								,typeitem:'DEN'
								,nameitem:'Đèn sân T3'}
							,{iditem:'L3MV1'
								,typeitem:'MV'
								,nameitem:'Cảnh báo Move T3'}
							,{iditem:'L3C1'
								,typeitem:'CAM'
								,nameitem:'Camera 1 T3'}
							,{iditem:'L3C2'
								,typeitem:'CAM'
								,nameitem:'Camera 2 T3'}
							,{iditem:'L3R1'
								,typeitem:'REM'
								,nameitem:'Rèm 1 phòng 1'}
							,{iditem:'L3R2'
								,typeitem:'REM'
								,nameitem:'Rèm 1 phòng 2'}
							,{iditem:'L3T1'
								,typeitem:'TT'
								,nameitem:'Trạng thái ban đêm'}
							,{iditem:'L3T2'
								,typeitem:'TT'
								,nameitem:'Trạng thái ban ngày'}
							,{iditem:'CB1'
								,typeitem:'CAMBIEN'
								,nameitem:'Nhiệt độ và độ ẩm bếp'}
							,{iditem:'CB2'
								,typeitem:'CAMBIEN'
								,nameitem:'Khí CO bếp'}
							,{iditem:'AT1'
								,typeitem:'ATOMAT'
								,nameitem:'Atomat bếp'}
							,{iditem:'CB3'
								,typeitem:'CAMBIEN'
								,nameitem:'dòng điện Bếp'}
							,{iditem:'CB4'
								,typeitem:'CAMBIEN'
								,nameitem:'Công suất điện tổng'}
							,{iditem:'AT2'
								,typeitem:'ATOMAT'
								,nameitem:'Atomat tổng'}
							,{iditem:'CB5'
								,typeitem:'CAMBIEN'
								,nameitem:'dòng điện tổng'}
								]}]
  })
});

/*
data: [{idlayout:'L1'
				,namelayout:'T 1'
				,listitem:[{iditem:'L1D1'
								,typeitem:'DEN'
								,nameitem:'den 1'},
							{iditem:'L1D2'
								,typeitem:'DEN'
								,nameitem:'den 2'},
							{iditem:'L1D3'
								,typeitem:'DEN'
								,nameitem:'den 3'}]}
			,{idlayout:'L2'
				,namelayout:'Tang 2'
				,listitem:[{iditem:'L2D1'
								,typeitem:'DEN'
								,nameitem:'den 1'}
							,{iditem:'L2Q1'
								,typeitem:'QUAT'
								,nameitem:'quat 1'}]}]
*/

//////
/*
Quạt: L1Q1,L2Q1,L2Q2,L3Q1,L3Q2=>
Đèn: L1D1,L1D2,L1D3,L1D4,L1D5,L1D6,L1D7,L1D8,L1D9,L1D10,L1D11,L1D12,L2D1,,,L2D4,L2D5,L2D6,L2D7,L2D8,L2D9,L3D1,L3D2,L3D3,L3D4,L3D5,L3D6,L3D7,L3D8
,L3D9=>
Bình Nóng lạnh: L1B1,L2B1,L3B1=>
Cảnh báo MV1: L1MV1,L2MV1,L3MV1=>
Camera: L1C1,L2C1,L2C2,L3C1,L3C2=>
RÈM: L1R1,L1R2,L2R1,L2R2,L3R1,L3R2=>
Trạng thái đêm: L1T1,L2T1,L3T1=>
Trạng thái ngày: L1T2,L2T2,L3T2=>
Điều hòa: L1DH1,L2DH1,L2DH2,L3DH1,L3DH2=>
Cảm biến:	CB1,	CB2,CB3,CB4,CB5=>
Atomat:		AT1,AT2    =>ATOMAT
*/
app.post('/api/statusbyid/', (req, res) => {
	var item= req.body.iditem;
	var s_type="";
	var s_nhietdo="0";
	var s_doam="0";
	var s_ampe="0";
	var s_congsuat="0";
	var s_co="0";
	var s_max="0";
	var stt="OFF";
	switch (item){
		case "CB3":
			s_type="CAMBIEN";
			s_ampe="100";
			break;
		case "CB4":
			s_type="CAMBIEN";
			s_congsuat="150000";
			break;
		case "CB5":
			s_type="CAMBIEN";
			s_ampe="120";
			break;
		case "AT1":
			s_type="ATOMAT";
			stt="ON";
			break;
		case "AT2":
			s_type="ATOMAT";
			stt="ON";
			break;
		case "CB1":
			s_type="CAMBIEN";
			s_doam="79";
			s_nhietdo="28";
			break;
		case "CB2":
			s_type="CAMBIEN";
			s_co="96";
			s_max="170";
			break;
		case "L1DH1":
			s_type="DIEUHOA";
			stt="ON";
			s_nhietdo="28";
			break;
		case "L2DH1":
			s_type="DIEUHOA";
			stt="OFF";
			s_nhietdo="29";
			break;
		case "L2DH2":
			s_type="DIEUHOA";
			stt="OFF";
			s_nhietdo="30";
			break;
		case "L3DH1":
		case "L3DH2":
			s_type="DIEUHOA";
			stt="ON";
			s_nhietdo="24";
			break;
		case "L1T1":
		case "L2T1":
		case "L3T1":
			s_type="TT";
			stt="OFF";
			break;
		case "L1T2":
		case "L2T2":
		case "L3T2":
			s_type="TT";
			stt="ON";
			break;
		case "L1R1":
		case "L2R1":
			s_type="REM";
			stt="0";
			break;
		case "L1R2":
		case "L2R2":
			s_type="REM";
			stt="1";
			break;
		case "L3R1":
			s_type="REM";
			stt="2";
			break;
		case "L3R2":
			s_type="REM";
			stt="3";
			break;
		case "L1C1":
		case "L2C1":
		case "L3C1":
			s_type="CAM";
			stt="ON";
			break;
		case "L2C2":
		case "L3C2":
			s_type="CAM";
			stt="OFF";
			break;
		case "L1MV1":
			s_type="MV";
			stt="ON";
			break;
		case "L2MV1":
		case "L3MV1":
			s_type="MV";
			stt="OFF";
			break;
		case "L1B1":
			s_type="BINHNONGLANH";
			stt="ON";
			break;
		case "L2B1":
		case "L3B1":
			s_type="BINHNONGLANH";
			stt="OFF";
			break;
		case "L1Q1":
		case "L2Q1":
			s_type="QUAT";
			stt="0";
			break;
		case "L2Q2":
			s_type="QUAT";
			stt="1";
			break;
		case "L3Q1":
			s_type="QUAT";
			stt="2";
			break;
		case "L3Q2":
			s_type="QUAT";
			stt="2";
			break;
		case "L1D1":
		case "L2D2":
		case "L3D3":
			s_type="DEN";
			stt="ON";
			break;
		case "L1D2":
		case "L1D3":
		case "L1D4":
		case "L1D5":
		case "L1D6":
		case "L1D7":
		case "L1D8":
		case "L1D9":
		case "L1D10":
		case "L1D11":
		case "L1D12":
		case "L2D1":
		case "L2D3":
		case "L2D4":
		case "L2D5":
		case "L2D6":
		case "L2D7":
		case "L2D8":
		case "L2D9":
		case "L3D1":
		case "L3D2":
		case "L3D4":
		case "L3D5":
		case "L3D6":
		case "L3D7":
		case "L3D8":
		case "L3D9":
			s_type="DEN";
			stt="OFF";
			break;
	}
	 res.status(200).send({
			success: 'true',
			message: 'Check trang thai thiet bi co ID la:' + item,
			data:{status: stt,type: s_type,iditem: item,nhietdo:s_nhietdo,doam:s_doam,ampe:s_ampe,congsuat:s_congsuat,co:s_co,max:s_max}
		  })
});
app.post('/api/statusbyid2/', (req, res) => {
	var item= req.body.iditem;
	var s_type="";
	var stt="OFF";
	/*socket.on('connect', function (socket) {
	console.log('Connected!');
	console.log(socket);
	});
	console.log('Goi ham check trang thai');
	socket.emit('CH01', 'me', 'T1 test msg');
	//
	
	socket.on('CH02', function (from, msg) {
		console.log('Server ban ve:', from, ' saying ', msg);
		B=msg;
		stt=msg;
		res.status(200).send({
			success: 'true',
			message: 'Check trang thai thiet bi co ID la:' + item,
			data:{status: stt,iditem: item}
		  })
	});*/
	 res.status(200).send({
			success: 'true',
			message: 'Check trang thai thiet bi co ID la:' + item,
			data:{status: 'OFF',iditem: item}
		  })
});

app.post('/api/statusbyid1/', (req, res) => {
	var item= req.body.iditem;
	var s_type="";
	var stt="";
	socket.on('connect', function (socket) {
	console.log('Connected!');
	console.log(socket);
	});
	socket.emit('CH01', 'me', 'T1 test msg');
	//
	
	socket.on('CH02', function (from, msg) {
		console.log('Server ban ve:', from, ' saying ', msg);
		B=msg;
		stt=msg;
	});
	
	
	switch (item){
		case "L1D1":
			s_type="DEN";
			break;
		case "L1D2":
			s_type="DEN";
			break;
		case "L1D3":
			s_type="DEN";
			break;
		case "L2D1":
			s_type="DEN";
			break;
		case "L2Q1":
			s_type="QUAT";
			break;
	}
	
	if(item=='L1D1')
	{
		stt=msg;
		
	}
	else
	{
		if (item=='L2D1')
			stt="ON";
		else
			stt="OFF";
	}
	
	
	 res.status(200).send({
			success: 'true',
			message: 'Check trang thai thiet bi co ID la:' + item,
			data:{status: stt,type: s_type ,iditem: item}
		  })
});
app.post('/api/updatestatusbyid/', (req, res) => {
	var item= req.body.iditem;
	var s_tatus=req.body.status;
	var s_type="";
	var s_nhietdo="0";
	var s_doam="0";
	var s_ampe="0";
	var s_congsuat="0";
	var s_co="0";
	var s_max="0";
	var stt="OFF";
	switch (item){
		case "CB3":
			s_type="CAMBIEN";
			s_ampe="100";
			break;
		case "CB4":
			s_type="CAMBIEN";
			s_congsuat="150000";
			break;
		case "CB5":
			s_type="CAMBIEN";
			s_ampe="120";
			break;
		case "AT1":
			s_type="ATOMAT";
			stt="ON";
			break;
		case "AT2":
			s_type="ATOMAT";
			stt="ON";
			break;
		case "CB1":
			s_type="CAMBIEN";
			s_doam="79";
			s_nhietdo="28";
			break;
		case "CB2":
			s_type="CAMBIEN";
			s_co="96";
			s_max="170";
			break;
		case "L1DH1":
			s_type="DIEUHOA";
			stt="ON";
			s_nhietdo="28";
			break;
		case "L2DH1":
			s_type="DIEUHOA";
			stt="OFF";
			s_nhietdo="29";
			break;
		case "L2DH2":
			s_type="DIEUHOA";
			stt="OFF";
			s_nhietdo="30";
			break;
		case "L3DH1":
		case "L3DH2":
			s_type="DIEUHOA";
			stt="ON";
			s_nhietdo="24";
			break;
		case "L1T1":
		case "L2T1":
		case "L3T1":
			s_type="TT";
			stt="OFF";
			break;
		case "L1T2":
		case "L2T2":
		case "L3T2":
			s_type="TT";
			stt="ON";
			break;
		case "L1R1":
		case "L2R1":
			s_type="REM";
			stt="0";
			break;
		case "L1R2":
		case "L2R2":
			s_type="REM";
			stt="1";
			break;
		case "L3R1":
			s_type="REM";
			stt="2";
			break;
		case "L3R2":
			s_type="REM";
			stt="3";
			break;
		case "L1C1":
		case "L2C1":
		case "L3C1":
			s_type="CAM";
			stt="ON";
			break;
		case "L2C2":
		case "L3C2":
			s_type="CAM";
			stt="OFF";
			break;
		case "L1MV1":
			s_type="MV";
			stt="ON";
			break;
		case "L2MV1":
		case "L3MV1":
			s_type="MV";
			stt="OFF";
			break;
		case "L1B1":
			s_type="BINHNONGLANH";
			stt="ON";
			break;
		case "L2B1":
		case "L3B1":
			s_type="BINHNONGLANH";
			stt="OFF";
			break;
		case "L1Q1":
		case "L2Q1":
			s_type="QUAT";
			stt="0";
			break;
		case "L2Q2":
			s_type="QUAT";
			stt="1";
			break;
		case "L3Q1":
			s_type="QUAT";
			stt="2";
			break;
		case "L3Q2":
			s_type="QUAT";
			stt="2";
			break;
		case "L1D1":
		case "L2D2":
		case "L3D3":
			s_type="DEN";
			stt="ON";
			break;
		case "L1D2":
		case "L1D3":
		case "L1D4":
		case "L1D5":
		case "L1D6":
		case "L1D7":
		case "L1D8":
		case "L1D9":
		case "L1D10":
		case "L1D11":
		case "L1D12":
		case "L2D1":
		case "L2D3":
		case "L2D4":
		case "L2D5":
		case "L2D6":
		case "L2D7":
		case "L2D8":
		case "L2D9":
		case "L3D1":
		case "L3D2":
		case "L3D4":
		case "L3D5":
		case "L3D6":
		case "L3D7":
		case "L3D8":
		case "L3D9":
			s_type="DEN";
			stt="OFF";
			break;
	}
	var message="";
	message= 'Cap nhat trang thai ID:' + item + ' thanh: '+s_tatus;
	socket.on('connect', function (socket) {
		console.log('Connected!');
		console.log(socket);
		});
	if(s_tatus=="ON")
	{
		
		socket.emit('CHON', 'me', 'bat len');
		console.log(s_tatus);
	}
	if(s_tatus=="OFF")
	{
		
		socket.emit('CHOFF', 'me', 'tat di');
		console.log(s_tatus);
	}
	
  res.status(200).send({
    success: 'true',
    message: message,
	data:{status: s_tatus,type: s_type,iditem: item}
  })
  
});

app.get('/api/v1/on', (req, res) => {

	socket.on('connect', function (socket) {
    console.log('Connected!');
	console.log(socket);
	});
	socket.emit('CHON', 'me', 'bat len');
  res.status(200).send({
    success: 'true',
    message: 'BAT LEN',
    todos: 'Da Gui Lenh Bat'
  })
});

app.get('/api/v1/off', (req, res) => {

	socket.on('connect', function (socket) {
    console.log('Connected!');
	console.log(socket);
	});
	socket.emit('CHOFF', 'me', 'tat di');
  res.status(200).send({
    success: 'true',
    message: 'TAT DI',
    todos: 'Da Gui Tat Di'
  })
});
const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT ||5000, () => {
  console.log(`server running on port ${PORT}`)
});
