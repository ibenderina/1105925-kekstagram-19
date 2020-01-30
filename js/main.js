'use strict';

var PHOTOS_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATARS = 1;
var MAX_AVATARS = 6;
var MIN_COMMENTS = 2;
var MAX_COMMENTS = 9;

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
];
var NAMES = [
  'Васютка',
  'Котанян',
  'Песель',
  'Куритто',
  'Попуг',
  'Собаня',
  'Мышан'
];

var chooseRandomEl = function (dataList) {
  var random = Math.floor(Math.random() * dataList.length);
  return dataList[random];
};

var chooseRandomInt = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

var createComments = function (count) {
  var createNewComment = [];
  for (var j = 0; j < count; j++) {
    createNewComment.push({
      avatar: 'img/avatar-' + chooseRandomInt(MIN_AVATARS, MAX_AVATARS) + '.svg',
      message: chooseRandomEl(MESSAGES),
      name: chooseRandomEl(NAMES)
    });
  }
  return createNewComment;
};

var createPhotos = function (photosCount) {
  var photosArray = [];
  for (var i = 1; i <= photosCount; i++) {
    photosArray.push({
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: chooseRandomInt(MIN_LIKES, MAX_LIKES),
      comments: createComments(chooseRandomInt(MIN_COMMENTS, MAX_COMMENTS))
    });
  }
  return photosArray;
};

var createPictureBlock = function (picture, pictureElTemplate) {
  var createPictureBlockEl = pictureElTemplate.cloneNode(true);
  var pictureElImg = createPictureBlockEl.querySelector('.picture__img');
  pictureElImg.src = picture.url;
  var pictureElLikes = createPictureBlockEl.querySelector('.picture__likes');
  pictureElLikes.textContent = picture.likes;
  var pictureElComments = createPictureBlockEl.querySelector('.picture__comments');
  pictureElComments.textContent = picture.comments.length.toString();

  return createPictureBlockEl;
};

var createPicturesBlock = function (pictureElTemplate) {
  var picturesList = new DocumentFragment();
  var photos = createPhotos(PHOTOS_COUNT);
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    picturesList.appendChild(createPictureBlock(photos[i], pictureElTemplate));
  }
  return picturesList;
};

var pictureEl = document.querySelector('#picture').content;
var pictureElItem = pictureEl.children[0];
var picturesHome = document.querySelector('.pictures');
picturesHome.appendChild(createPicturesBlock(pictureElItem));
