var EventEmitter = require('events').EventEmitter;
var util = require('util');

const INTERVAL_TIME_MS = 1000;

var interval = null;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var WebRTC = module.exports = function (options) {
  var emitter = this;

  if (!(this instanceof WebRTC)) {
    return new WebRTC(options);
  }
  EventEmitter.call(this);

  var elVideo = options.elVideo;
  var elSnapshot = options.elSnapshot;
  var intervalTime = options.intervalTime || INTERVAL_TIME_MS;

  if (!elVideo || !elSnapshot) {
    throw new Error("Invalid arguments given");
  }

  navigator.webkitGetUserMedia({ video: true}, function(stream) {
    elVideo.src = window.URL.createObjectURL(stream);
  });

  this.on('newListener', function () {
    maybeStartData(intervalTime, emitter, elVideo, elSnapshot);
  });
  this.on('removeListener', function () {
    maybeStopData(emitter, elVideo, elSnapshot);
  });
};

util.inherits(WebRTC, EventEmitter);

function maybeStartData (intervalTime, emitter, elVideo, elSnapshot) {
  if (interval) return;

  interval = setInterval(function () {
    if (!elVideo.src) return;
    emitter.emit('data', getData(elVideo, elSnapshot))
  }, intervalTime);
}

function maybeStopData(emitter) {
  if (!interval) return;
  if (emitter.listeners("data").length) return;
  clearInterval(interval);
}

function getData (elVideo, elSnapshot) {
  var c;

  elSnapshot.width = elVideo.clientWidth;
  elSnapshot.height = elVideo.clientHeight;

  c = elSnapshot.getContext("2d");
  c.drawImage(elVideo, 0, 0, elSnapshot.width, elSnapshot.height);
  return elSnapshot.toDataURL("image/png");
}