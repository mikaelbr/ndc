var Bacon = require('baconjs');

var webrtc = require('../lib/webrtc_bus');
// var WebRTC = require('../lib/webrtc_events');

var $ = require('jquery');
var _ = require('../lib/utils');

module.exports = function (bpm) {

  var pulseIsOverInput =
    bpm.combine(_.propertyFromBPMInput(),
      (a, b) => a >= b);

  var rtc = webrtc({
      elVideo: _.$$("video"),
      elSnapshot: _.$$("#screenshots")
    });

  var picture = rtc.filter(pulseIsOverInput);

  picture
    .assign($(".test-image"), "attr", "src");

  picture
    .map(Boolean)
    .toProperty(false)
    .assign($(".test-image"), "toggle");

  rtc
    .map(Boolean)
    .toProperty(false)
    .assign($("input[type=number]"), "toggle");

  return picture;
};