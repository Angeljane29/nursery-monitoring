#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

String SERVER_IP = "192.168.254.104:4000";
int SPRAY = D4; // Wet Indicator at Digital pin D0
int TANK_EMPTY = D3;
int sense_Pin = 0; // sensor input at Analog pin A0

const int trigPin = D5;
const int echoPin = D6;

boolean WATERING = false;
int SPRAY_DURATION = 30000;
boolean FILL_TANK = false;
int elapsed = 0;

long duration;
int distance;


const char* ssid = "GlobeAtHome_B44DC";
const char* pass = "0NHLH5D8D5B";

bool nowifi = false;

WiFiClient client;
HTTPClient httpClient;


void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output

  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  pinMode(SPRAY, OUTPUT);
  pinMode(TANK_EMPTY, OUTPUT);
  Serial.begin(9600); // Starts the serial communication

  digitalWrite(SPRAY, HIGH);
  digitalWrite(TANK_EMPTY, HIGH);
  // put your setup code here, to run once:
  Serial.begin(9600);
  if (!nowifi) {
    WiFi.begin(ssid, pass);

    while (WiFi.status() != WL_CONNECTED) {
      Serial.print("Connect to network!");
      delay(1000);
    }

    Serial.println(WiFi.localIP());
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  int moistureValue = getMoisture();
  int waterValue = senseWater();

  if (waterValue < 30 || FILL_TANK) {
    digitalWrite(TANK_EMPTY, LOW);
  }
  
  if(waterValue>= 97){
   digitalWrite(TANK_EMPTY, HIGH);
   FILL_TANK = false; 
  }

  if (WATERING == false) {
    digitalWrite(SPRAY, HIGH);

    if (!nowifi) {
      updateApi("send-soil", moistureValue);
      updateApi("send-water", waterValue);
    }
    Serial.print("Water level:");
    Serial.println(waterValue);
    Serial.print("Moisture level:");
    Serial.println(moistureValue);

    if (shouldFillTank()) {
      FILL_TANK = true;
    }

    if (shouldWater()&& moistureValue > 50)WATERING = true;

  } else {
    Serial.println("Spraying :" + elapsed);
    Serial.println(elapsed);
    digitalWrite(SPRAY, LOW);
    elapsed = elapsed + 1000;

    if (elapsed >= SPRAY_DURATION) {
      WATERING = false;
      elapsed = 0;
    }
  }



  delay(1000);


}
int getMoisture() {
  Serial.print("MOISTURE LEVEL : ");
  int value = analogRead(sense_Pin);
  int vdiff = 1024 - value;
  float mval = (((float)(vdiff)) / 1024) * 100;
  return mval;

}
int senseWater() {
  int distance = getDistance();

  int waterLevel = 28 - distance;
  Serial.println(waterLevel);
  float percentaged = ((float)(waterLevel)) / 25;
  Serial.println(percentaged);

  return percentaged * 100;
}
int getDistance() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for '10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration * 0.034 / 2;
  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
  return distance;
}
void updateApi(String route, int val) {
  String url = "http://" + SERVER_IP + "/" + route + "/" + val;
  const char *URL = url.c_str();

  Serial.println("Sending Request to");
  Serial.println(URL);
  httpClient.begin(client, URL);
  httpClient.GET();
  String content = httpClient.getString();
  httpClient.end();

  Serial.println(content);

}
boolean shouldFillTank() {
  String url = "http://" + SERVER_IP + "/should-fill-tank";
  const char *URL = url.c_str();

  Serial.println("Sending Request to");
  Serial.println(URL);
  httpClient.begin(client, URL);
  httpClient.GET();
  String content = httpClient.getString();
  httpClient.end();
  return content == "go";
}

boolean shouldWater() {
  String url = "http://" + SERVER_IP + "/should-water";
  const char *URL = url.c_str();

  Serial.println("Sending Request to");
  Serial.println(URL);
  httpClient.begin(client, URL);
  httpClient.GET();
  String content = httpClient.getString();
  httpClient.end();
  return content == "go";

}
