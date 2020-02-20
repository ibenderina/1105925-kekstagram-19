'use strict';

(function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadSubmit = document.querySelector('.img-upload__submit');

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
      window.utilities.onSetupSubmitClick(evt, imgUploadForm);
    }
  });

  imgUploadSubmit.addEventListener('keydown', function (evt) {
    if (imgUploadForm.checkValidity()) {
      window.utilities.onSetupSubmitEnterKeydown(evt, imgUploadForm);
    }
  });

  window.imgUploadPreview = imgUploadPreview;
})();
