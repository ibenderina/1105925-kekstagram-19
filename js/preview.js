'use strict';

(function () {
  var createBigPicture = function (bigPicture, photo) {
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureLikes = bigPicture.querySelector('.likes-count');

    bigPictureImg.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
  };

  var createBigPictureComment = function (bigPicture, photo) {
    var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
    var bigPictureCommentItem = window.utilities.getTemplate('#social-comment');
    var photoCommentsElement = window.comments.createBlock(photo.comments, bigPictureCommentItem);
    bigPictureCommentsBlock.innerHTML = '';
    bigPictureCommentsBlock.appendChild(photoCommentsElement);
    window.comments.showHiddenComment();
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

  var bigPictureEl = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');

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


