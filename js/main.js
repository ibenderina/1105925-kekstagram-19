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
  'Пëсель',
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
    var commentsCount = chooseRandomInt(MIN_COMMENTS, MAX_COMMENTS);
    photosArray.push({
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: chooseRandomInt(MIN_LIKES, MAX_LIKES),
      comments: createComments(commentsCount)
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

var createPicturesBlock = function (photos, pictureElTemplate) {
  var picturesList = new DocumentFragment();
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    picturesList.appendChild(createPictureBlock(photos[i], pictureElTemplate));
  }
  return picturesList;
};

// создаем DOM для комментов
var createCommentsBlock = function (comments, commentTemplate) {
  var commentList = new DocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    var currentComment = comments[i];
    var bigPictureCommentElement = commentTemplate.cloneNode(true);
    var bigPictureCommentsImg = bigPictureCommentElement.querySelector('.social__picture');
    bigPictureCommentsImg.src = currentComment.avatar;
    bigPictureCommentsImg.alt = currentComment.name;
    var bigPictureCommentsText = bigPictureCommentElement.querySelector('.social__text');
    bigPictureCommentsText.textContent = currentComment.message;
    commentList.appendChild(bigPictureCommentElement);
  }
  return commentList;
};

var getTemplate = function (selector) {
  var template = document.querySelector(selector);

  if (template) {
    return template.content.children[0];
  }
  return null;
};

// создаем фоточки
var photosList = createPhotos(PHOTOS_COUNT);

// создаем и размещаем DOM-элементы для фоточек
var pictureElItem = getTemplate('#picture');
var picturesHome = document.querySelector('.pictures');
var photosBlock = createPicturesBlock(photosList, pictureElItem);
picturesHome.appendChild(photosBlock);

var firstPhoto = photosList[0];

// информация для большой фоточки - лайки, комменты, ссылка на картинку
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
var bigPictureImg = bigPicture.querySelector('.big-picture__img');
bigPictureImg.src = firstPhoto.url;
var bigPictureLikes = bigPicture.querySelector('.likes-count');
bigPictureLikes.textContent = firstPhoto.likes;
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
bigPictureCommentsCount.textContent = firstPhoto.comments.length.toString();

// вызываем функцию создания DOM для комментов
var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
var bigPictureCommentItem = getTemplate('#social-comment');
var firstPhotoComments = firstPhoto.comments;
var firstPhotoCommentsElement = createCommentsBlock(firstPhotoComments, bigPictureCommentItem);
bigPictureCommentsBlock.appendChild(firstPhotoCommentsElement);

var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');
var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

var body = document.querySelector('body');
body.classList.add('modal-open');
