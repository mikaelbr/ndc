var Bacon = require('baconjs');
var Pusher = require('pusher');

var pusher = new Pusher('c12a7cbce4c696c849ae');
var channel = pusher.subscribe('heartrate');

// var random = function (min, max) {
//   return function () {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
// };

// var create = module.exports.create = function (min, max) {
//   min = min || 60;
//   max = max || 130;

//   // Generate a random mock of a pulse
//   return Bacon.interval(100, 1)
//               .map(random(min, max));

// };

module.exports = function () {
  var bpm = Bacon.fromEventTarget(channel, 'data')
          .map('.value')
          .map(Number);

  return bpm;
};


// module.exports = create();