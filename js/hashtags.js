'use strict';

(function () {
  var FIRST_SYMBOL = '#';
  var SYMBOL_PATTERN = new RegExp('[\\d\\wа-я]', 'ug');
  var ERROR_BORDER = 'text__hashtags--invalid';
  var Error = {
    AMOUNT: 'Нельзя указать больше пяти хэш-тегов',
    FIRST_SYMBOL: 'Укажите символ # в начале хэштега',
    LENGTH: 'Длина хэштега должна быть от 1 до 20 символов',
    SYMBOLS: 'Строка после решётки должна состоять только из букв и чисел',
    REPEAT: 'Нельзя использовать один и тот же хэштег два и более раз'
  };
  var Length = {
    MAX: 5,
    MIN_HASHTAG: 1,
    MAX_HASHTAG: 20
  };
  var textHashtags = document.querySelector('.text__hashtags');

  var setHashtagsValidation = function (hashtags) {
    if (hashtags.length > Length.MAX) {
      return Error.AMOUNT;
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (hashtag[0] !== FIRST_SYMBOL) {
        return Error.FIRST_SYMBOL;
      }
      if (hashtag.length <= Length.MIN_HASHTAG || hashtag.length > Length.MAX_HASHTAG) {
        return Error.LENGTH;
      }
      var hashtagValidator = hashtag.match(SYMBOL_PATTERN) || [];
      if (hashtag.slice(1) !== hashtagValidator.join('')) {
        return Error.SYMBOLS;
      }
      if (hashtags.indexOf(hashtag, i + 1) !== -1) {
        return Error.REPEAT;
      }
    }
    return '';
  };

  textHashtags.addEventListener('input', function (evt) {
    var inputElement = evt.target;
    var hashtags = inputElement.value.trim().toLowerCase();
    var errorMessage = '';
    if (hashtags.length > 0) {
      hashtags = hashtags.split(' ');
      errorMessage = setHashtagsValidation(hashtags);
    }
    inputElement.setCustomValidity(errorMessage);
    inputElement.reportValidity();
    if (errorMessage === '') {
      inputElement.classList.remove(ERROR_BORDER);
    }
  });

  textHashtags.addEventListener('keydown', function (evt) {
    if (evt.key === window.utilities.Key.ESC) {
      evt.stopPropagation();
    }
  });
})();
