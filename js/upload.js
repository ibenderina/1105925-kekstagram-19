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
      window.utilities.onCloseWindowClick(imgUploadOverlay);
    }, window.upload.onPictureLoadError);
  };

  var onSetupSubmitEnterKeydown = function (evt, form) {
    if (evt.key === window.utilities.ENTER_KEY) {
      onSetupSubmitClick(evt, form);
    }
  };

  var onPictureLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
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
    if (evt.key === window.utilities.ESC_KEY) {
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
