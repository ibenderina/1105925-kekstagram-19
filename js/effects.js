'use strict';

(function () {
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
      filter: 'blur'
    },
    'heat': {
      min: 1,
      max: 3,
      unit: '',
      filter: 'brightness'
    }
  };
  var IMG_PREVIEW_CLASS = 'img-upload__preview effects__preview--';
  var effectsList = document.querySelector('.effects__list');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var getFilter = function (effect, value) {
    var calculatedValue = value * effect.max + effect.min;
    return effect.filter + '(' + calculatedValue + effect.unit + ')';
  };

  var setFilterSaturation = function (coords) {
    var effect = document.querySelector('.effects__radio:checked');

    if (effect) {
      var filter = EFFECTS[effect.value];
      if (filter) {
        var levelPart = coords / effectLevelLine.clientWidth;
        window.imgUploadPreview.style.filter = getFilter(filter, levelPart);
      }
    }
  };

  var effectLevelCoords = function (coords) {
    if (coords >= 0 && coords <= effectLevelLine.clientWidth) {
      effectLevelPin.style.left = coords + 'px';
      effectLevelDepth.style.width = coords + 'px';
    }

    setFilterSaturation(coords);
  };

  effectsList.addEventListener('change', function (evt) {
    var effect = evt.target.value;

    window.imgUploadPreview.classList.value = IMG_PREVIEW_CLASS + effect;
    window.imgUploadPreview.style.filter = '';
    window.scale.setImageScale(window.scale.MAX_SCALE);

    if (effect === 'none') {
      imgUploadEffectLevel.classList.add(window.utilities.HIDDEN_CLASS);
    } else {
      imgUploadEffectLevel.classList.remove(window.utilities.HIDDEN_CLASS);
      effectLevelCoords(effectLevelLine.clientWidth);
    }
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;
    var trigger = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      trigger = true;
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      var coords = (effectLevelPin.offsetLeft - shift);

      effectLevelCoords(coords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (trigger) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          effectLevelPin.removeEventListener('click', onClickPreventDefault);
        };
        effectLevelPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
