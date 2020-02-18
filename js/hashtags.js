'use strict';

(function () {
  var textHashtags = document.querySelector('.text__hashtags');

  var hashtagsValidation = function (hashtags) {
    if (hashtags.length > 5) {
      return 'Нельзя указать больше пяти хэш-тегов';
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (hashtag[0] !== '#') {
        return 'Укажите символ # в начале хэштега';
      }
      if (hashtag.length <= 1 || hashtag.length > 20) {
        return 'Длина хэштега должна быть от 1 до 20 символов';
      }
      var hashtagValidator = hashtag.match(new RegExp('[\\d\\wа-я]', 'ug')) || [];
      if (hashtag.slice(1) !== hashtagValidator.join('')) {
        return 'Строка после решётки должна состоять только из букв и чисел';
      }
      if (hashtags.indexOf(hashtag, i + 1) !== -1) {
        return 'Нельзя использовать один и тот же хэштег два и более раз';
      }
    }
    return '';
  };

  textHashtags.addEventListener('input', function (evt) {
    var inputElement = evt.target;
    var hashtags = inputElement.value.trim().toLowerCase();
    if (hashtags.length <= 0) {
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
