'use strict';

(function () {
  window.ESC_KEY = 'Escape';
  window.ENTER_KEY = 'Enter';
  window.HIDDEN_CLASS = 'hidden';
  window.chooseRandomEl = function (dataList) {
    var random = Math.floor(Math.random() * dataList.length);

    return dataList[random];
  };

  window.chooseRandomInt = function (min, max) {
    var random = min + Math.random() * (max + 1 - min);

    return Math.floor(random);
  };

  window.getTemplate = function (selector) {
    var template = document.querySelector(selector);

    if (template) {
      return template.content.children[0];
    }
    return null;
  };

  window.onCloseWindowClick = function (element) {
    element.classList.add(window.HIDDEN_CLASS);
    document.body.classList.remove('modal-open');
  };

  window.onSetupSubmitClick = function (evt, form) {
    form.submit();
  };

  window.onSetupSubmitEnterKeydown = function (evt, form) {
    if (evt.key === window.ENTER_KEY) {
      window.onSetupSubmitClick(evt, form);
    }
  };

  window.onScaleControlClick = function (min, max, step, value) {
    value = parseInt(value, 10);
    var scaleValue = value + step;
    if (scaleValue >= min && scaleValue <= max) {
      return scaleValue;
    }
    return value;
  };
})();
