'use strict';

(function () {
  var Scale = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var setImageScale = function (value) {
    scaleControlValue.value = value + '%';
    window.upload.imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  scaleControlSmaller.addEventListener('click', function () {
    var valueResult = window.utilities.onScaleControlClick(Scale.MIN, Scale.MAX, -Scale.STEP, scaleControlValue.value);
    setImageScale(valueResult);
  });

  scaleControlBigger.addEventListener('click', function () {
    var valueResult = window.utilities.onScaleControlClick(Scale.MIN, Scale.MAX, Scale.STEP, scaleControlValue.value);
    setImageScale(valueResult);
  });

  window.scale = {
    setImageScale: setImageScale,
    MAX: Scale.MAX
  };
})();
