'use strict';

(function () {
  var ERROR_AMOUNT = 'Нельзя указать больше пяти хэш-тегов';
  var ERROR_FIRST_SYMBOL = 'Укажите символ # в начале хэштега';
  var ERROR_LENGTH = 'Длина хэштега должна быть от 1 до 20 символов';
  var ERROR_SYMBOLS = 'Строка после решётки должна состоять только из букв и чисел';
  var ERROR_REPEAT = 'Нельзя использовать один и тот же хэштег два и более раз';
  var MAX_LENGTH = 5;
  var MIN_HASHTAG_LENGTH = 1;
  var MAX_HASHTAG_LENGTH = 20;
  var FIRST_SYMBOL = '#';
  var SYMBOL_PATTERN = new RegExp('[\\d\\wа-я]', 'ug');

  var textHashtags = document.querySelector('.text__hashtags');

  var hashtagsValidation = function (hashtags) {
    if (hashtags.length > MAX_LENGTH) {
      return ERROR_AMOUNT;
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (hashtag[0] !== FIRST_SYMBOL) {
        return ERROR_FIRST_SYMBOL;
      }
      if (hashtag.length <= MIN_HASHTAG_LENGTH || hashtag.length > MAX_HASHTAG_LENGTH) {
        return ERROR_LENGTH;
      }
      var hashtagValidator = hashtag.match(SYMBOL_PATTERN) || [];
      if (hashtag.slice(1) !== hashtagValidator.join('')) {
        return ERROR_SYMBOLS;
      }
      if (hashtags.indexOf(hashtag, i + 1) !== -1) {
        return ERROR_REPEAT;
      }
    }
    return '';
  };

  textHashtags.addEventListener('input', function (evt) {
    var inputElement = evt.target;
    var hashtags = inputElement.value.trim().toLowerCase();
    if (hashtags.length <= 0) {
      inputElement.setCustomValidity('');
      return;
    }
    hashtags = hashtags.split(' ');

    var errorMessage = hashtagsValidation(hashtags);
    inputElement.setCustomValidity(errorMessage);
    inputElement.reportValidity();
  });

  textHashtags.addEventListener('keydown', function (evt) {
    if (evt.key === window.ESC_KEY) {
      evt.stopPropagation();
    }
  });
})();
