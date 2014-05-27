var _ = require('./utils');
var audio = _.$$("#heartbeat-sound");
var sound = null;

var resetAudio = function () {
  try {
    audio.currentTime = 0;
    audio.src = audio.src;
  } catch (e) { }
};

var pause = function () {
  audio.pause()
  resetAudio();
};

module.exports = function () {
  if(!audio) return;
  clearTimeout(sound);

  audio.pause();
  audio.volume = 1.0

  if(audio.readyState >= 2 || audio.readyState == 0) {
    resetAudio();
    audio.play();
  }

  sound = setTimeout(pause, 1000);
  return audio;
};