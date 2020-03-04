'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter',
  };
  window.utilities = {
    HIDDEN_CLASS: 'hidden',

    debounce: function (callback, debounceInterval) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          callback.apply(null, parameters);
        }, debounceInterval | DEBOUNCE_INTERVAL);
      };
    },

    chooseRandomEl: function (dataList) {
      var random = Math.floor(Math.random() * dataList.length);

      return dataList[random];
    },

    chooseRandomInt: function (min, max) {
      var random = min + Math.random() * (max + 1 - min);

      return Math.floor(random);
    },

    getTemplate: function (selector) {
      var template = document.querySelector(selector);

      if (template) {
        return template.content.children[0];
      }
      return null;
    },

    onCloseWindowClick: function (element, form) {
      element.classList.add(this.HIDDEN_CLASS);
      document.body.classList.remove('modal-open');
      if (form) {
        form.reset();
      }
    },

    onScaleControlClick: function (min, max, step, value) {
      value = parseInt(value, 10);
      var scaleValue = value + step;
      if (scaleValue >= min && scaleValue <= max) {
        return scaleValue;
      }
      return value;
    },

    Key: Key
  };
})();
