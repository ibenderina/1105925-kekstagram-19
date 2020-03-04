'use strict';

(function () {
  var RANDOM_COUNT = 10;

  var pictureElItem = window.utilities.getTemplate('#picture');
  var imgFilters = document.querySelector('.img-filters');
  var filterRandom = document.querySelectorAll('.img-filters__button');
  var imgFiltersButton = document.querySelectorAll('.img-filters__button');
  var smallPictures = document.querySelector('.pictures');

  var filters = {
    'filter-random': function () {
      var random = Math.floor(Math.random() * (window.photosList.length - RANDOM_COUNT));
      renderPictures(window.photosList.slice(random, random + RANDOM_COUNT));
    },
    'filter-discussed': function () {
      var sortedPhotos = window.photosList.slice().sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
      renderPictures(sortedPhotos);
    },
    'filter-default': function () {
      renderPictures(window.photosList);
    }
  };

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

  var renderPictures = function (userPictures) {
    var photosBlock = createPictureBlocks(userPictures, pictureElItem);
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (i) {
      i.remove();
    });
    smallPictures.appendChild(photosBlock);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var loadData = function () {
    window.backend.load(function (userPictures) {
      userPictures.forEach(function (picture, i) {
        picture.id = i;
      });
      window.photosList = userPictures;
      renderPictures(userPictures);
    }, window.upload.onPictureLoadError);
  };

  var setActiveFilterButton = function (activeElement) {
    imgFiltersButton.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    activeElement.classList.add('img-filters__button--active');
  };

  var filterData = window.utilities.debounce(function (filter) {
    var filterCb = filters[filter];
    if (filterCb) {
      filterCb();
    }
  });

  loadData();

  smallPictures.addEventListener('click', function (evt) {
    window.renderPhoto(evt);
  });

  smallPictures.addEventListener('keydown', function (evt) {
    if (evt.key === window.utilities.Key.ENTER) {
      window.renderPhoto(evt);
    }
  });

  filterRandom.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      var element = evt.target;
      if (!element.classList.contains('img-filters__button--active') || element.id === 'filter-random') {
        setActiveFilterButton(element);
        filterData(element.id);
      }
    });
  });
  window.filterRandom = filterRandom;
})();
