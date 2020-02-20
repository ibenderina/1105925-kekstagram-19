'use strict';

(function () {
  var createBigPicture = function (bigPicture, photo) {
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureLikes = bigPicture.querySelector('.likes-count');
    var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');

    bigPictureImg.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
    bigPictureCommentsCount.textContent = photo.comments.length.toString();
  };

  var createBigPictureComment = function (bigPicture, photo) {
    var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
    var bigPictureCommentItem = window.utilities.getTemplate('#social-comment');
    var photoComments = photo.comments;
    var photoCommentsElement = window.comments.createBlock(photoComments, bigPictureCommentItem);

    bigPictureCommentsBlock.appendChild(photoCommentsElement);
  };

  var renderPhoto = function (evt) {
    var picture = evt.target.closest('.picture');
    var pictureId = Number(picture.dataset.id);
    var photoData = window.picture.photosList.find(function (photo) {
      return photo.id === pictureId;
    });
    if (photoData) {
      createBigPicture(bigPictureEl, photoData);
      createBigPictureComment(bigPictureEl, photoData);
      bigPictureEl.classList.remove(window.utilities.HIDDEN_CLASS);
    }
  };

  var bigPictureEl = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');

  bigPictureClose.addEventListener('click', function () {
    window.utilities.onCloseWindowClick(bigPictureEl);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.ESC_KEY) {
      window.utilities.onCloseWindowClick(bigPictureEl);
    }
  });

  window.renderPhoto = renderPhoto;
})();


