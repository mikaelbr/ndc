var Bacon = require('baconjs');
var $ = require('jquery');


// Convert bpm to stream of beats (pulse)
module.exports = function (bpm) {

  var interval = bpm
    // Change pulse interval to change only each 10 sec
    .debounceImmediate(1000 * 10)
    .map(function (pulse) {
      return Math.round((60 / pulse) * 1000);
    });

  // interval.log("Change to interval:");

  var heartBeat = interval
    .flatMapLatest(Bacon.interval)
    .map(true);

  // heartBeat.log("Pulse!");

  var beatsChart = chart.beats();

  Bacon
    .interval(50, 0)
    .merge(heartBeat.map(2))
    .toProperty(0)
    .onValue(function (data) {
      beatsChart.append(new Date().getTime(), data);
    });

  return heartBeat;
};