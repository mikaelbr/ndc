var Bacon = require('baconjs');
var $ = require('jquery');
var _ = require('./lib/utils');
var comp = require('./components/');
var chart = require('./lib/charts');
var sound = require('./lib/sound');

var bpmChart = chart.bpm();
var bpm = require('./mock');

// Draw the beats per minute
bpm
  // Only draw every 500ms
  .throttle(500)
  // .log()
  .onValue(function (data) {
    bpmChart.append(new Date().getTime(), data);
  });

// Show picture of me every time I have a pulse over given input
comp.picture(bpm).log();

// Show pulse (heart beats)
var beatsChart = chart.beats();
var pulse = comp.beatsFrom(bpm);
pulse.filter(_.isChecked()).onValue(sound);


Bacon.interval(50, 0)
  .merge(pulse.map(2))
  .toProperty(0)
  .onValue(function (data) {
    beatsChart.append(new Date().getTime(), data);
  });