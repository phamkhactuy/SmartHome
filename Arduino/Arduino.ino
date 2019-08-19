#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <SerialCommand.h>  // Thêm vào sketch thư viện Serial Command
#include <DHT.h> // Gọi thư viện DHT22

const int DHTPIN = 13; //Đọc dữ liệu từ DHT22 ở chân D2 trên mạch Arduino
const int DHTTYPE = DHT22; //Khai báo loại cảm biến, có 2 loại là DHT11 và DHT22
DHT dht(DHTPIN, DHTTYPE);

const byte RX = 3;          // Chân 3 được dùng làm chân RX
const byte TX = 2;          // Chân 2 được dùng làm chân TX

SoftwareSerial mySerial = SoftwareSerial(RX, TX);
SerialCommand sCmd(mySerial); // Khai báo biến sử dụng thư viện Serial Command


const int fanOffPin = 4;  
const int fanOnPin = 5;

const int speed1Pin = 6;
const int speed2Pin = 7;
const int speed3Pin = 8;

const int lightControlPin = 9;
const int lightStatusPin = 11;

const int ATControlPin = 10;
const int ATStatusPin = 12;


void setup() {
  //Khởi tạo Serial ở baudrate 115200 để debug ở serial monitor
  Serial.begin(115200);

  dht.begin(); // Khởi động cảm biến nhiệt

  //Khởi tạo Serial ở baudrate 115200 cho cổng Serial thứ hai, dùng cho việc kết nối với ESP8266
  mySerial.begin(115200);
  // initialize the LED pin as an output:
  pinMode(fanOnPin, OUTPUT);
  pinMode(fanOffPin, OUTPUT);
  pinMode (ATControlPin, OUTPUT);
  pinMode(lightControlPin, OUTPUT);

  pinMode (lightStatusPin, INPUT);
  pinMode (ATStatusPin, INPUT);
  pinMode(speed1Pin, INPUT);
  pinMode(speed2Pin, INPUT);
  pinMode(speed3Pin, INPUT);

 digitalWrite(fanOffPin, HIGH);
  Serial.println("Da san sang nhan lenh");
  //Xử lý thực hiện lệnh từ server
  sCmd.addCommand("F_ON",   onClickButtonOnFan); //Khi có lệnh F_ON thì sẽ thực thi hàm buttonOnClicked
  sCmd.addCommand("F_OFF",   onClickButtonOffFan);
  sCmd.addCommand("L_CHANGE",   onChangeLight);
  sCmd.addCommand("AT_CHANGE",   onChangeAtomat);  //Thay đổi hàm
  //Xử lý lấy dữ liệu khi có lệnh từ server
  sCmd.addCommand("FAN",   sendStatusFan);
  sCmd.addCommand("LED",   sendStatusLight);
  sCmd.addCommand("APTOMAT",   sendStatusAptomat);
  sCmd.addCommand("T_H_C",   sendTempHumi);

}
unsigned long chuky = 0;
const unsigned long TIME_RETRIEVE_DATA = 5000UL; //Cứ sau 2000ms = 5s thì chu kỳ lặp lại

void loop() {

  if (millis() - chuky > TIME_RETRIEVE_DATA) {
    chuky = millis();
    sendStatusFan();
    sendStatusLight();
    sendStatusAptomat();
    sendTempHumi();
  }

  sCmd.readSerial();
  delay(200);
}

// *****************************************
//   Cảnh báo nhiệt độ bếp
//******************************************

void nhietdo_bep()
{
  float h = dht.readHumidity(); //Đọc độ ẩm
  float t = dht.readTemperature(); //Đọc nhiệt độ

  Serial.print("Nhiet do: ");
  Serial.println(t); //Xuất nhiệt độ
  Serial.print("Do am: ");
  Serial.print(h); //Xuất độ ẩm
  Serial.println("%");
  delay(100);
}

// *****************************************
//   Tắt quạt trần tầng một
// ******************************************

void onClickButtonOffFan() {
  Serial.println("[FAN]Button OFF clicked");
  digitalWrite(fanOffPin, LOW);
  delay(50);
  digitalWrite(fanOffPin, HIGH);
  sendStatusFan();
}
// *****************************************
//   Bật quạt trần tầng một
//******************************************

void onClickButtonOnFan() {
  Serial.println("[FAN]Fan on clicked");
  digitalWrite(fanOnPin, HIGH);
  delay(50);
  digitalWrite(fanOnPin, LOW);
  sendStatusFan();
}
// *****************************************
//   Bật/tắt đèn P.khách01
//******************************************

void onChangeLight() {
  Serial.println("[LIGHT]Change light");
  digitalWrite(lightControlPin, HIGH);
  delay(100);
  digitalWrite(lightControlPin, LOW);

  sendStatusLight();
}
// *****************************************
//   Bật/tắt Atomat tổng
//******************************************
void onChangeAtomat() {
  Serial.println("Change Atomat");

  digitalWrite(ATControlPin, HIGH);
  delay(50);
  digitalWrite(ATControlPin, LOW);
  sendStatusAptomat();
}

void sendTempHumi() {
  float h = dht.readHumidity(); //Đọc độ ẩm
  float t = dht.readTemperature(); //Đọc nhiệt độ

  StaticJsonBuffer<200> jsonBuffer2;
  JsonObject& root = jsonBuffer2.createObject();
  root["temp"] = t;
  root["humi"] = h;

  //in ra cổng software serial để ESP8266 nhận
  mySerial.print("THC_STATUS");   //gửi tên lệnh
  mySerial.print('\r');           // gửi \r
  root.printTo(mySerial); //gửi chuỗi JSON
  mySerial.print('\r');           // gửi \r
  Serial.print("TEMP_HUMIDITY_CO: ");
  root.printTo(Serial);
  Serial.print('\n');

}
// *****************************************
//   Đọc trạng thái đèn P.khách01
//******************************************

void sendStatusLight() {
  int lightStatus = !digitalRead(lightStatusPin);
  //Send data to ESP8266
  StaticJsonBuffer<200> jsonBuffer2;
  JsonObject& root2 = jsonBuffer2.createObject();
  root2["led1"] = lightStatus;
  //in ra cổng software serial để ESP8266 nhận
  mySerial.print("L_STATUS");   //gửi tên lệnh
  mySerial.print('\r');           // gửi \r
  root2.printTo(mySerial); //gửi chuỗi JSON
  mySerial.print('\r');           // gửi \r
  Serial.print("LED: ");
  root2.printTo(Serial);
  Serial.print('\n');
}
// *****************************************
//   Đọc trạng thái quạt trần tầng một.
//******************************************

void sendStatusFan() {
  // read the state of the level fan value:
  int speed1Status = !digitalRead(speed1Pin);
  int speed2Status = !digitalRead(speed2Pin);
  int speed3Status = !digitalRead(speed3Pin);
  //Send data to ESP8266
  StaticJsonBuffer<200> jsonBuffer2;
  JsonObject& root2 = jsonBuffer2.createObject();
  root2["speed1"] = speed1Status;
  root2["speed2"] = speed2Status;
  root2["speed3"] = speed3Status;
  //in ra cổng software serial để ESP8266 nhận
  mySerial.print("F_STATUS");   //gửi tên lệnh
  mySerial.print('\r');           // gửi \r
  root2.printTo(mySerial); //gửi chuỗi JSON
  mySerial.print('\r');           // gửi \r

  //in ra Serial Arduino để debug
  Serial.print("FAN:  ");
  root2.printTo(Serial); //Xuống dòng
  Serial.print('\n');
}
// *****************************************
//   Đọc trạng thái Atomat tổng
//******************************************

void sendStatusAptomat() {
  int statusAT = !digitalRead(ATStatusPin);
  //Send data to ESP8266
  StaticJsonBuffer<200> jsonBuffer2;
  JsonObject& root2 = jsonBuffer2.createObject();
  root2["status"] = statusAT;
  //in ra cổng software serial để ESP8266 nhận
  mySerial.print("AT_STATUS");   //gửi tên lệnh
  mySerial.print('\r');           // gửi \r
  root2.printTo(mySerial); //gửi chuỗi JSON
  mySerial.print('\r');           // gửi \r

  //in ra Serial Arduino để debug
  Serial.print("AT: ");
  root2.printTo(Serial); //Xuống dòng
  Serial.print('\n');
}


