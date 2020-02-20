'use strict';

(function () {
  window.utilities = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter',
    HIDDEN_CLASS: 'hidden',
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

    onCloseWindowClick: function (element) {
      element.classList.add(this.HIDDEN_CLASS);
      document.body.classList.remove('modal-open');
    },

    onSetupSubmitClick: function (evt, form) {
      form.submit();
    },

    onSetupSubmitEnterKeydown: function (evt, form) {
      if (evt.key === this.ENTER_KEY) {
        this.onSetupSubmitClick(evt, form);
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
  };
})();
