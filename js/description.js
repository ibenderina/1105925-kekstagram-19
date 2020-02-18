'use strict';

(function () {
  var textDescription = document.querySelector('.text__description');

  textDescription.addEventListener('input', function (evt) {
    var textAreaElement = evt.target;

    if (textAreaElement.value.length > 140) {
      textAreaElement.setCustomValidity('Длина комментария должна быть не больше 140 символов');
      textAreaElement.reportValidity();
    }
  });

  textDescription.addEventListener('keydown', function (evt) {
    if (evt.key === window.ESC_KEY) {
      evt.stopPropagation();
    }
  });
})();
