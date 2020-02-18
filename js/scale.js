'use strict';

(function () {
  var MIN_SCALE = 25;
  window.MAX_SCALE = 100;
  var SCALE_STEP = 25;
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  window.setImageScale = function (value) {
    scaleControlValue.value = value + '%';
    window.imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  scaleControlSmaller.addEventListener('click', function () {
    var valueResult = window.onScaleControlClick(MIN_SCALE, window.MAX_SCALE, -SCALE_STEP, scaleControlValue.value);
    window.setImageScale(valueResult);
  });

  scaleControlBigger.addEventListener('click', function () {
    var valueResult = window.onScaleControlClick(MIN_SCALE, window.MAX_SCALE, SCALE_STEP, scaleControlValue.value);
    window.setImageScale(valueResult);
  });
})();
