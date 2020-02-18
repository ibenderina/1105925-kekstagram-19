'use strict';

(function () {
// информация для большой фоточки - лайки, комменты, ссылка на картинку
  var createBigPicture = function (bigPicture, photo) {
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureLikes = bigPicture.querySelector('.likes-count');
    var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');

    bigPictureImg.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
    bigPictureCommentsCount.textContent = photo.comments.length.toString();
  };

  // вызываем функцию создания DOM для комментов
  var createBigPictureComment = function (bigPicture, photo) {
    var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
    var bigPictureCommentItem = window.getTemplate('#social-comment');
    var photoComments = photo.comments;
    var photoCommentsElement = window.createCommentsBlock(photoComments, bigPictureCommentItem);

    bigPictureCommentsBlock.appendChild(photoCommentsElement);
  };

  var onPhotoClick = function (evt) {
    var picture = evt.target.closest('.picture');
    if (picture) {
      var pictureImg = picture.querySelector('.picture__img');
      if (pictureImg) {
        for (var i = 0; i < window.photosList.length; i++) {
          if (pictureImg.src.includes(window.photosList[i].url)) {
            createBigPicture(bigPictureEl, window.photosList[i]);
            createBigPictureComment(bigPictureEl, window.photosList[i]);
            bigPictureEl.classList.remove(window.HIDDEN_CLASS);
            return;
          }
        }
      }
    }
  };

  var bigPictureEl = document.querySelector('.big-picture');

  window.picturesHome.addEventListener('click', function (evt) {
    onPhotoClick(evt);
  });

  window.picturesHome.addEventListener('keydown', function (evt) {
    if (evt.key === window.ENTER_KEY) {
      onPhotoClick(evt);
    }
  });

  var bigPictureClose = document.querySelector('.big-picture__cancel');

  bigPictureClose.addEventListener('click', function () {
    window.onCloseWindowClick(bigPictureEl);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.ESC_KEY) {
      window.onCloseWindowClick(bigPictureEl);
    }
  });
})();


