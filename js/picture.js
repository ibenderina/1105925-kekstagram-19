'use strict';

var PHOTOS_COUNT = 25;
var MIN_COMMENTS = 2;
var MAX_COMMENTS = 9;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

(function () {
  window.createPhotos = function (photosCount) {
    var photosArray = [];

    for (var i = 1; i <= photosCount; i++) {
      var commentsCount = window.chooseRandomInt(MIN_COMMENTS, MAX_COMMENTS);
      photosArray.push({
        url: 'photos/' + i + '.jpg',
        description: '',
        likes: window.chooseRandomInt(MIN_LIKES, MAX_LIKES),
        comments: window.createComments(commentsCount)
      });
    }
    return photosArray;
  };

  var createPictureBlock = function (picture, pictureElTemplate) {
    var createPictureBlockEl = pictureElTemplate.cloneNode(true);
    var pictureElImg = createPictureBlockEl.querySelector('.picture__img');
    var pictureElLikes = createPictureBlockEl.querySelector('.picture__likes');
    var pictureElComments = createPictureBlockEl.querySelector('.picture__comments');

    pictureElImg.src = picture.url;
    pictureElLikes.textContent = picture.likes;
    pictureElComments.textContent = picture.comments.length.toString();

    return createPictureBlockEl;
  };

  window.createPicturesBlock = function (photos, pictureElTemplate) {
    var picturesList = new DocumentFragment();
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      picturesList.appendChild(createPictureBlock(photos[i], pictureElTemplate));
    }
    return picturesList;
  };

  // создаем фоточки
  window.photosList = window.createPhotos(window.PHOTOS_COUNT);

  // создаем и размещаем DOM-элементы для фоточек
  var pictureElItem = window.getTemplate('#picture');
  window.picturesHome = document.querySelector('.pictures');
  var photosBlock = window.createPicturesBlock(window.photosList, pictureElItem);
  window.picturesHome.appendChild(photosBlock);
})();
