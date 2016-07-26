/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function() {
    console.log('ready!');
    window.addEventListener("batterystatus", app.batteryStatus, false);
    navigator.accelerometer.watchAcceleration(app.accelStatus, function(){}, { frequency: 100 });
    navigator.compass.watchHeading(app.compassStatus);
    navigator.geolocation.watchPosition(app.geopos, function(){}, { maximumAge: 10, timeout: 5000, enableHighAccuracy: true });
    app.vibrate();
    // navigator.device.capture.captureVideo();
    // app.playAudio('media/donald.mp3');
  },

  geopos: function(pos) {
    console.log(pos);
  },

  compassStatus: function(heading) {
    console.log(heading);
  },

  accelStatus: function(acceleration) {
    console.log('Acceleration X: ' + acceleration.x + '\n' +
      'Acceleration Y: ' + acceleration.y + '\n' +
      'Acceleration Z: ' + acceleration.z + '\n' +
      'Timestamp: ' + acceleration.timestamp + '\n');
  },

  vibrate: function() {
    app.vibrateInterval = setInterval(function() {
      navigator.vibrate(3000);
    }, 10);
  },

  playAudio: function(src) {
    console.log('playing!!!!!');
    // Create Media object from src
    my_media = new Media(src);

    // Play audio
    my_media.play();
  },

  batteryStatus: function(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
    document.querySelector('#battery').textContent = "Level: " + status.level + " isPlugged: " + status.isPlugged;
    $.get('http://192.168.0.20:8888/battery/', {status: status.level});
  }
};
