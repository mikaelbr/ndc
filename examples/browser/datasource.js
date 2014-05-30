var Bacon = require('baconjs');
var Pusher = require('pusher');


var p = new Pusher('c12a7cbce4c696c849ae');
var channel = p.subscribe('heartrate');

module.exports = function () {

};
