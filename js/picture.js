'use strict';

(function () {
  var PHOTOS_COUNT = 25;
  var MIN_COMMENTS = 2;
  var MAX_COMMENTS = 9;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var PHOTO_ADDRESS = 'photos/';
  var PHOTO_EXTENSION = '.jpg';
  var pictureElItem = window.utilities.getTemplate('#picture');

  var createPhotos = function (photosCount) {
    var photosArray = [];

    for (var i = 1; i <= photosCount; i++) {
      var commentsCount = window.utilities.chooseRandomInt(MIN_COMMENTS, MAX_COMMENTS);
      photosArray.push({
        id: i,
        url: PHOTO_ADDRESS + i + PHOTO_EXTENSION,
        description: '',
        likes: window.utilities.chooseRandomInt(MIN_LIKES, MAX_LIKES),
        comments: window.comments.create(commentsCount)
      });
    }
    return photosArray;
  };

  var createPictureBlocks = function (photos, pictureElTemplate) {
    var picturesList = new DocumentFragment();
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      picturesList.appendChild(createPictureBlock(photos[i], pictureElTemplate));
    }
    return picturesList;
  };

  var createPictureBlock = function (picture, pictureElTemplate) {
    var createPictureBlockEl = pictureElTemplate.cloneNode(true);
    var pictureElImg = createPictureBlockEl.querySelector('.picture__img');
    var pictureElLikes = createPictureBlockEl.querySelector('.picture__likes');
    var pictureElComments = createPictureBlockEl.querySelector('.picture__comments');

    createPictureBlockEl.dataset.id = picture.id;
    pictureElImg.src = picture.url;
    pictureElLikes.textContent = picture.likes;
    pictureElComments.textContent = picture.comments.length.toString();

    return createPictureBlockEl;
  };

  var photosList = createPhotos(PHOTOS_COUNT);
  var photosBlock = createPictureBlocks(photosList, pictureElItem);
  var smallPictures = document.querySelector('.pictures');
  smallPictures.appendChild(photosBlock);

  smallPictures.addEventListener('click', function (evt) {
    window.renderPhoto(evt);
  });

  window.picture.smallPictures.addEventListener('keydown', function (evt) {
    if (evt.key === window.utilities.ENTER_KEY) {
      window.renderPhoto(evt);
    }
  });

  window.picture = {
    create: createPhotos,
    createBlock: createPictureBlock,
    smallPictures: smallPictures,
    photosList: photosList
  };
})();
