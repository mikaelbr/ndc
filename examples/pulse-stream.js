var Bacon = require('baconjs');

var random = function (min, max) {
  return function () {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

// Generate a random mock of a pulse
var bpm = Bacon.interval(100, 1)
               .map(random(60, 120));

// Convert pulse to
var interval = bpm
  // Change pulse interval to change only each 10sek
  .debounceImmediate(1000 * 10)
  .map(function (pulse) {
    return Math.round((60 / pulse) * 1000);
  });

interval.log("Change to interval:");

var heartBeat = interval
  .flatMapLatest(Bacon.interval)
  .map(true);

heartBeat.log("Pulse!");