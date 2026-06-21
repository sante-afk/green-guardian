#include "DHT.h"
#define DHT_PIN 2
#define WATER_PIN 6
#define KY_DIGITAL_PIN  4
#define KY_ANALOG_PIN  A0
#define SIGNAL_WATER_PIN A5
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(9600);
  pinMode(DHT_PIN, OUTPUT);
  pinMode(WATER_PIN, OUTPUT);
  pinMode(KY_DIGITAL_PIN, INPUT);
  digitalWrite(WATER_PIN, LOW);  
  dht.begin();
}

void loop() {
  if (Serial.available() > 0) {
    char command = Serial.read();
    if (command == 'G' || command == 'g') {
      sendData();  
    }
  }
}

void sendData() {
  // dht pin
  int h = dht.readHumidity();
  int t = dht.readTemperature();
  
  if (isnan(h) || isnan(t)) {  
    Serial.println("Error");
    return;
  }
  Serial.print(h);
  Serial.print("h");
  Serial.print(t);
  Serial.print("t");
  
  // water pin
  digitalWrite(WATER_PIN, HIGH);
  delay(10);
  int w = analogRead(SIGNAL_WATER_PIN);
  digitalWrite(WATER_PIN, LOW);
  Serial.print(w);
  Serial.print("w");

  // ky 038 pin
  Serial.print(digitalRead(KY_DIGITAL_PIN));
  Serial.print("kd");
  Serial.print(analogRead(KY_ANALOG_PIN));
  Serial.print("ka");
  Serial.println();
}
