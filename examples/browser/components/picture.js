var Bacon = require('baconjs');

var webrtc = require('../lib/webrtc_bus');
// var WebRTC = require('../lib/webrtc_events');

var $ = require('jquery');
var _ = require('../lib/utils');

module.exports = function (bpm) {

  var pulseIsOverInput =
    bpm.combine(_.propertyFromBPMInput(), function(a, b) {
      return a >= b;
    });

  var picture =
    webrtc({
      elVideo: _.$$("video"),
      elSnapshot: _.$$("#screenshots")
    })
    .filter(pulseIsOverInput);

  picture.assign($(".test-image"), "attr", "src");

  return picture;
};