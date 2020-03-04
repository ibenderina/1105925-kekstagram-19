'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ERROR_BORDER = 'text__hashtags--invalid';
  var imgUploadPreviewWrapper = document.querySelector('.img-upload__preview');
  var imgUploadPreview = imgUploadPreviewWrapper.querySelector('img');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadSubmit = document.querySelector('.img-upload__submit');
  var uploadPreview = document.querySelector('.img-upload__preview img');
  var uploadSmallPreview = document.querySelectorAll('.effects__preview');

  var onSetupSubmitClick = function (evt, form) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.save(data, function () {
      window.effectOriginal.click();
      window.utilities.onCloseWindowClick(imgUploadOverlay, form);
      onPictureLoadSuccess();
      window.photosList.push({
        id: window.photosList.length,
        url: uploadPreview.src,
        likes: 0,
        comments: [],
        description: data.get('description') + ' ' + data.get('hashtags')
      });
      window.filterRandom[0].click();
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
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        uploadPreview.src = reader.result;
        var backgroundImage = 'url(' + reader.result + ')';
        uploadSmallPreview.forEach(function (item) {
          item.style.backgroundImage = backgroundImage;
        });
      });

      reader.readAsDataURL(file);
    }
  });

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
    evt.preventDefault();
    var invalids = imgUploadForm.querySelectorAll('input:invalid');
    invalids.forEach(function (item) {
      item.classList.add(ERROR_BORDER);
    });
    if (imgUploadForm.checkValidity()) {
      onSetupSubmitClick(evt, imgUploadForm);
    }
    imgUploadForm.reportValidity();
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
