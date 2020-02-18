'use strict';

(function () {
  window.imgUploadPreview = document.querySelector('.img-upload__preview');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadSubmit = document.querySelector('.img-upload__submit');

  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove(window.HIDDEN_CLASS);
    document.body.classList.add('modal-open');
  });

  imgUploadCancel.addEventListener('click', function () {
    window.onCloseWindowClick(imgUploadOverlay);
    uploadFile.value = '';
    window.imgUploadPreview.style.transform = 'scale(1)';
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.ESC_KEY) {
      window.onCloseWindowClick(imgUploadOverlay);
      uploadFile.value = '';
      window.imgUploadPreview.style.transform = 'scale(1)';
    }
  });

  imgUploadSubmit.addEventListener('click', function (evt) {
    if (imgUploadForm.checkValidity()) {
      window.onSetupSubmitClick(evt, imgUploadForm);
    }
  });

  imgUploadSubmit.addEventListener('keydown', function (evt) {
    if (imgUploadForm.checkValidity()) {
      window.onSetupSubmitEnterKeydown(evt, imgUploadForm);
    }
  });
})();
