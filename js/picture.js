'use strict';

(function () {
  var pictureElItem = window.utilities.getTemplate('#picture');

  var createPictureBlocks = function (photos, pictureElTemplate) {
    var picturesList = new DocumentFragment();
    for (var i = 0; i < photos.length; i++) {
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

  var smallPictures = document.querySelector('.pictures');

  window.backend.load(function (userPictures) {
    for (var i = 0; i < userPictures.length; i++) {
      userPictures[i].id = i;
    }
    var photosBlock = createPictureBlocks(userPictures, pictureElItem);
    window.picture.photosList = userPictures;
    smallPictures.appendChild(photosBlock);
  }, window.upload.onPictureLoadError
  );

  smallPictures.addEventListener('click', function (evt) {
    window.renderPhoto(evt);
  });

  smallPictures.addEventListener('keydown', function (evt) {
    if (evt.key === window.utilities.ENTER_KEY) {
      window.renderPhoto(evt);
    }
  });

  window.picture = {
    createBlock: createPictureBlock,
    smallPictures: smallPictures
  };
})();
