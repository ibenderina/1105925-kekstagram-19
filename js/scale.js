'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var setImageScale = function (value) {
    scaleControlValue.value = value + '%';
    window.imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  scaleControlSmaller.addEventListener('click', function () {
    var valueResult = window.utilities.onScaleControlClick(MIN_SCALE, MAX_SCALE, -SCALE_STEP, scaleControlValue.value);
    setImageScale(valueResult);
  });

  scaleControlBigger.addEventListener('click', function () {
    var valueResult = window.utilities.onScaleControlClick(MIN_SCALE, MAX_SCALE, SCALE_STEP, scaleControlValue.value);
    setImageScale(valueResult);
  });

  window.scale = {
    setImageScale: setImageScale,
    MAX_SCALE: MAX_SCALE
  };
})();
