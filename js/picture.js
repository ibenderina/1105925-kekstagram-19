'use strict';

(function () {
  var RANDOM_COUNT = 10;

  var pictureElItem = window.utilities.getTemplate('#picture');
  var imgFilters = document.querySelector('.img-filters');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterDefault = document.querySelector('#filter-default');
  var imgFiltersButton = document.querySelectorAll('.img-filters__button');

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

  var loadData = function (filterCb) {
    window.backend.load(function (userPictures) {
      userPictures.forEach(function (picture, i) {
        picture.id = i;
      });

      if (filterCb) {
        userPictures = filterCb(userPictures);
      }
      var photosBlock = createPictureBlocks(userPictures, pictureElItem);
      window.picture.photosList = userPictures;
      var pictures = document.querySelectorAll('.picture');
      pictures.forEach(function (i) {
        i.remove();
      });
      smallPictures.appendChild(photosBlock);
      imgFilters.classList.remove('img-filters--inactive');
    }, window.upload.onPictureLoadError);
  };

  var debouncedLoadData = window.utilities.debounce(loadData);

  var activeFilterButton = function (activeElement) {
    imgFiltersButton.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    activeElement.classList.add('img-filters__button--active');
  };

  var smallPictures = document.querySelector('.pictures');

  loadData();

  smallPictures.addEventListener('click', function (evt) {
    window.renderPhoto(evt);
  });

  smallPictures.addEventListener('keydown', function (evt) {
    if (evt.key === window.utilities.ENTER_KEY) {
      window.renderPhoto(evt);
    }
  });

  filterRandom.addEventListener('click', function () {
    activeFilterButton(filterRandom);
    debouncedLoadData(function (userPictures) {
      var random = Math.floor(Math.random() * (userPictures.length - RANDOM_COUNT));
      return userPictures.slice(random, random + RANDOM_COUNT);
    });

  });

  filterDiscussed.addEventListener('click', function () {
    activeFilterButton(filterDiscussed);
    debouncedLoadData(function (userPictures) {
      return userPictures.slice().sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
    });
  });

  filterDefault.addEventListener('click', function () {
    activeFilterButton(filterDefault);
    debouncedLoadData();
  });

  window.picture = {
    createBlock: createPictureBlock,
    smallPictures: smallPictures
  };
})();
