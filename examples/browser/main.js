var Bacon = require('baconjs');
var $ = require('jquery');
var _ = require('./lib/utils');
var comp = require('./components/');
var chart = require('./lib/charts');
var sound = require('./lib/sound');

var $textBpm = $(".first h2 span");

var bpmChart = chart.bpm();
var bpm = require('./datasource')();

// Draw the beats per minute

// Show text string graph

// Show picture of me every time I have a pulse over given input

// Show pulse (heart beats)

// Play sound