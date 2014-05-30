var Bacon = require('baconjs');
var $ = require('jquery');
var _ = require('./lib/utils');
var comp = require('./components/');
var chart = require('./lib/charts');
var sound = require('./lib/sound');

var bpmChart = chart.bpm();
var bpm = require('./datasource')();

// Draw the beats per minute
bpm
  .onValue((data) =>
    bpmChart.append(new Date().getTime(), data));

// Show above graph
bpm.toProperty(0).assign($(".first h2 span"), 'text');

// Show picture of me every time I have a pulse over given input
comp.picture(bpm).log();


// Show pulse (heart beats)
var pulse = comp.beatsFrom(bpm);

// Play sound
pulse.filter(_.isChecked()).onValue(sound);
