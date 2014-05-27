var smoothie = require('smoothie');
var _ = require('../lib/utils');

module.exports = {
  create: create,
  bpm: function () {
    return create(_.$$("#bpm"), { resetBounds: false });
  },
  beats: function () {
    return create(_.$$("#heartbeats"), {
      intervalTime: 1000,
      maxValue: 3,
      minValue: -1,
      grid: {
        strokeStyle: '#000'
      },
      labels: {
        disabled: true
      },
      interpolation: 'linear'
    }, {
      strokeStyle: 'rgba(0, 255, 0, 1)',
      fillStyle: null,
      lineWidth: 2
    });
  }
};

function create (elCanvas, options, seriesOptions) {
  intervalTime = options.intervalTime || 500;

  var timeSeries = new smoothie.TimeSeries(options);

  var chart = new smoothie.SmoothieChart(options);

  chart.addTimeSeries(timeSeries, seriesOptions || {
    strokeStyle: 'rgba(0, 255, 0, 1)',
    fillStyle: 'rgba(0, 255, 0, 0.2)',
    lineWidth: 4
  });

  chart.streamTo(elCanvas, intervalTime);

  return timeSeries;
}