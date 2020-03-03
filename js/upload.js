'use strict';

(function () {
  var imgUploadPreviewWrapper = document.querySelector('.img-upload__preview');
  var imgUploadPreview = imgUploadPreviewWrapper.querySelector('img');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadSubmit = document.querySelector('.img-upload__submit');

  var onSetupSubmitClick = function (evt, form) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.save(data, function () {
      window.effectOriginal.click();
      window.utilities.onCloseWindowClick(imgUploadOverlay, form);
      onPictureLoadSuccess();
    }, function () {
      window.effectOriginal.click();
      window.utilities.onCloseWindowClick(imgUploadOverlay, form);
      onPictureLoadError();
    });
  };

  var onSetupSubmitEnterKeydown = function (evt, form) {
    if (evt.key === window.utilities.Key.ENTER) {
      onSetupSubmitClick(evt, form);
    }
  };

  var onPictureMessage = function (messageType) {
    var errorTemplate = window.utilities.getTemplate('#' + messageType).cloneNode(true);
    var main = document.querySelector('main');

    main.appendChild(errorTemplate);
    window.addEventListener('keydown', function (evt) {
      if (evt.key === window.utilities.Key.ESC) {
        errorTemplate.remove();
      }
    });
    errorTemplate.addEventListener('click', function () {
      errorTemplate.remove();
    });
  };

  var onPictureLoadError = function () {
    onPictureMessage('error');
  };

  var onPictureLoadSuccess = function () {
    onPictureMessage('success');
  };

  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove(window.utilities.HIDDEN_CLASS);
    document.body.classList.add('modal-open');
  });

  imgUploadCancel.addEventListener('click', function () {
    window.utilities.onCloseWindowClick(imgUploadOverlay);
    uploadFile.value = '';
    imgUploadPreview.style.transform = 'scale(1)';
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.utilities.Key.ESC) {
      window.utilities.onCloseWindowClick(imgUploadOverlay);
      uploadFile.value = '';
      imgUploadPreview.style.transform = 'scale(1)';
    }
  });

  imgUploadSubmit.addEventListener('click', function (evt) {
    if (imgUploadForm.checkValidity()) {
      onSetupSubmitClick(evt, imgUploadForm);
    }
  });

  imgUploadSubmit.addEventListener('keydown', function (evt) {
    if (imgUploadForm.checkValidity()) {
      onSetupSubmitEnterKeydown(evt, imgUploadForm);
    }
  });

  window.upload = {
    imgUploadPreview: imgUploadPreview,
    onPictureLoadError: onPictureLoadError
  };
})();
