'use strict';

(function () {
  var bigPictureEl = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var createBigPicture = function (bigPicture, photo) {
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureLikes = bigPicture.querySelector('.likes-count');
    var bigPictureCaption = bigPicture.querySelector('.social__caption');

    bigPictureImg.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
    bigPictureCaption.textContent = photo.description;
  };

  var createBigPictureComment = function (bigPicture, photo) {
    var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
    var bigPictureCommentItem = window.utilities.getTemplate('#social-comment');
    var photoCommentsElement = window.comments.createBlock(photo.comments, bigPictureCommentItem);
    bigPictureCommentsBlock.innerHTML = '';
    bigPictureCommentsBlock.appendChild(photoCommentsElement);
    window.comments.hideCommentsLoader();
    window.comments.renderCommentCounter();
  };

  var renderPhoto = function (evt) {
    var picture = evt.target.closest('.picture');
    if (picture) {
      var pictureId = Number(picture.dataset.id);
      var photoData = window.photosList.find(function (photo) {
        return photo.id === pictureId;
      });
      if (photoData) {
        createBigPicture(bigPictureEl, photoData);
        createBigPictureComment(bigPictureEl, photoData);
        bigPictureEl.classList.remove(window.utilities.HIDDEN_CLASS);
      }
    }
  };

  bigPictureClose.addEventListener('click', function () {
    window.utilities.onCloseWindowClick(bigPictureEl);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.utilities.Key.ESC) {
      window.utilities.onCloseWindowClick(bigPictureEl);
    }
  });

  window.renderPhoto = renderPhoto;
})();


