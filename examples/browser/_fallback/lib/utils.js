var Bacon = require('baconjs');
var $ = require('jquery');

var $$ = module.exports.$$ = document.querySelector.bind(document);

module.exports.propertyFromBPMInput = function () {
  var el = $$("#max-bpm");
  return Bacon.fromEventTarget(el, "change")
              .map(".target.value")
              .map(Number)
              .toProperty(el.value);
};

module.exports.isChecked = function () {
  var el = $$("#do-play-sound");
  return Bacon.fromEventTarget(el, "change")
              .map(".target.checked")
              .toProperty(el.checked);
};

