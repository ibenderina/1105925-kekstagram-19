'use strict';

(function () {
  var MAX_LENGTH = 140;
  var ERROR_LENGTH = 'Длина комментария должна быть не больше 140 символов';
  var textDescription = document.querySelector('.text__description');

  textDescription.addEventListener('input', function (evt) {
    var textAreaElement = evt.target;

    if (textAreaElement.value.length > MAX_LENGTH) {
      textAreaElement.setCustomValidity(ERROR_LENGTH);
      textAreaElement.reportValidity();
    }
  });

  textDescription.addEventListener('keydown', function (evt) {
    if (evt.key === window.utilities.Key.ESC) {
      evt.stopPropagation();
    }
  });
})();
