'use strict';

(function () {
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

  var FIRST_SYMBOL = '#';
  var SYMBOL_PATTERN = new RegExp('[\\d\\wа-я]', 'ug');

  var textHashtags = document.querySelector('.text__hashtags');

  var hashtagsValidation = function (hashtags) {
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
