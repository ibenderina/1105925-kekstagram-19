'use strict';

var EFFECTS = {
  'chrome': {
    min: 0,
    max: 1,
    unit: '',
    filter: 'grayscale'
  },
  'sepia': {
    min: 0,
    max: 1,
    unit: '',
    filter: 'sepia'
  },
  'marvin': {
    min: 0,
    max: 100,
    unit: '%',
    filter: 'invert'
  },
  'phobos': {
    min: 0,
    max: 3,
    unit: 'px',
    filter: blur
  },
  'heat': {
    min: 1,
    max: 3,
    unit: '',
    filter: 'brightness'
  }
};

(function () {
  var effectsList = document.querySelector('.effects__list');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

  var getFilter = function (effect, value) {
    var calculatedValue = value * effect.max + effect.min;
    return effect.filter + '(' + calculatedValue + effect.unit + ')';
  };

  effectsList.addEventListener('change', function (evt) {
    var effect = evt.target.value;

    window.imgUploadPreview.classList.value = 'img-upload__preview effects__preview--' + effect;
    window.imgUploadPreview.style.filter = '';
    window.setImageScale(window.MAX_SCALE);

    if (effect === 'none') {
      imgUploadEffectLevel.classList.add(window.HIDDEN_CLASS);
    } else {
      imgUploadEffectLevel.classList.remove(window.HIDDEN_CLASS);
    }
  });

  effectLevelPin.addEventListener('mouseup', function (evt) {
    var levelPinCoordinate = evt.target.getBoundingClientRect();
    var levelLineCoordinate = effectLevelLine.getBoundingClientRect();
    var levelValue = levelPinCoordinate.x - levelLineCoordinate.x;
    var effect = document.querySelector('.effects__radio:checked');

    if (effect) {
      var filter = EFFECTS[effect.value];
      if (filter) {
        var levelPart = levelValue / levelLineCoordinate.width;
        window.imgUploadPreview.style.filter = getFilter(filter, levelPart);
      }
    }
  });
})();


