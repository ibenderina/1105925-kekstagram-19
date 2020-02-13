'use strict';

var PHOTOS_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATARS = 1;
var MAX_AVATARS = 6;
var MIN_COMMENTS = 2;
var MAX_COMMENTS = 9;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var SCALE_STEP = 25;
var HIDDEN_CLASS = 'hidden';
var EFFECTS = {
  'chrome': {
    min: 0,
    max: 1,
    unit: '',
    filter: 'grayscale'
  },
  'sepia': {
    min: 0,
    max: 1,
    unit: '',
    filter: 'sepia'
  },
  'marvin': {
    min: 0,
    max: 100,
    unit: '%',
    filter: 'invert'
  },
  'phobos': {
    min: 0,
    max: 3,
    unit: 'px',
    filter: blur
  },
  'heat': {
    min: 1,
    max: 3,
    unit: '',
    filter: 'brightness'
  },
  'none': undefined
};

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
  var pictureElLikes = createPictureBlockEl.querySelector('.picture__likes');
  var pictureElComments = createPictureBlockEl.querySelector('.picture__comments');

  pictureElImg.src = picture.url;
  pictureElLikes.textContent = picture.likes;
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
    var bigPictureCommentsText = bigPictureCommentElement.querySelector('.social__text');

    bigPictureCommentsImg.src = currentComment.avatar;
    bigPictureCommentsImg.alt = currentComment.name;
    bigPictureCommentsText.textContent = currentComment.message;
    commentList.appendChild(bigPictureCommentElement);
  }
  return commentList;
};

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
  var bigPictureCommentItem = getTemplate('#social-comment');
  var photoComments = photo.comments;
  var photoCommentsElement = createCommentsBlock(photoComments, bigPictureCommentItem);

  bigPictureCommentsBlock.appendChild(photoCommentsElement);
};

var getTemplate = function (selector) {
  var template = document.querySelector(selector);

  if (template) {
    return template.content.children[0];
  }
  return null;
};

var onScaleControlClick = function (min, max, step, value) {
  value = parseInt(value, 10);
  var scaleValue = value + step;
  if (scaleValue >= min && scaleValue <= max) {
    return scaleValue;
  }
  return value;
};

var onCloseWindowClick = function (element) {
  element.classList.add(HIDDEN_CLASS);
  document.body.classList.remove('modal-open');
};

var getFilter = function (effect, value) {
  var calculatedValue = value * effect.max + effect.min;
  return effect.filter + '(' + calculatedValue + effect.unit + ')';
};

var onSetupSubmitClick = function (evt, form) {
  form.submit();
};

var onSetupSubmitEnterKeydown = function (evt, form) {
  if (evt.key === ENTER_KEY) {
    onSetupSubmitClick(evt, form);
  }
};

var onPhotoClick = function (evt) {
  var picture = evt.target.closest('.picture');
  if (picture) {
    var pictureImg = picture.querySelector('.picture__img');
    if (pictureImg) {
      for (var i = 0; i < photosList.length; i++) {
        if (pictureImg.src.includes(photosList[i].url)) {
          createBigPicture(bigPictureEl, photosList[i]);
          createBigPictureComment(bigPictureEl, photosList[i]);
          bigPictureEl.classList.remove(HIDDEN_CLASS);
          return;
        }
      }
    }
  }
};

var hashtagsValidation = function (hashtags) {
  if (hashtags.length > 5) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];
    if (hashtag[0] !== '#') {
      return 'Укажите символ # в начале хэштега';
    }
    if (hashtag.length <= 1 || hashtag.length > 20) {
      return 'Длина хэштега должна быть от 1 до 20 символов';
    }
    var hashtagValidator = hashtag.match(new RegExp('[\d\wа-я]', 'ug')) || [];
    if (hashtag.slice(1) !== hashtagValidator.join('')) {
      return 'Строка после решётки должна состоять только из букв и чисел';
    }
    if (hashtags.indexOf(hashtag, i + 1) !== -1) {
      return 'Нельзя использовать один и тот же хэштег два и более раз';
    }
  }
  return '';
};

// создаем фоточки
var photosList = createPhotos(PHOTOS_COUNT);

// создаем и размещаем DOM-элементы для фоточек
var pictureElItem = getTemplate('#picture');
var picturesHome = document.querySelector('.pictures');
var photosBlock = createPicturesBlock(photosList, pictureElItem);
picturesHome.appendChild(photosBlock);

var bigPictureEl = document.querySelector('.big-picture');

picturesHome.addEventListener('click', function (evt) {
  onPhotoClick(evt);
});

picturesHome.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    onPhotoClick(evt);
  }
});

var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

socialCommentCount.classList.add(HIDDEN_CLASS);
commentsLoader.classList.add(HIDDEN_CLASS);

var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var bigPictureClose = document.querySelector('.big-picture__cancel');
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var uploadFile = document.querySelector('#upload-file');
var effectsList = document.querySelector('.effects__list');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var textHashtags = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');
var imgUploadForm = document.querySelector('.img-upload__form');
var imgUploadSubmit = document.querySelector('.img-upload__submit');

textHashtags.addEventListener('input', function (evt) {
  var inputElement = evt.target;
  var hashtags = inputElement.value.trim().toLowerCase();
  if (hashtags.length <= 0) {
    return;
  }
  hashtags = hashtags.split(' ');

  var errorMessage = hashtagsValidation(hashtags);
  inputElement.setCustomValidity(errorMessage);
  inputElement.reportValidity();
});

textDescription.addEventListener('input', function (evt) {
  var textAreaElement = evt.target;

  if (textAreaElement.value.length > 140) {
    textAreaElement.setCustomValidity('Длина комментария должна быть не больше 140 символов');
    textAreaElement.reportValidity();
  }
});

textHashtags.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    evt.stopPropagation();
  }
});

effectsList.addEventListener('change', function (evt) {
  var effect = evt.target.value;

  imgUploadPreview.classList.value = 'img-upload__preview effects__preview--' + effect;
  imgUploadPreview.style.filter = '';
  setImageScale(MAX_SCALE);

  if (effect === 'none') {
    imgUploadEffectLevel.classList.add(HIDDEN_CLASS);
  } else {
    imgUploadEffectLevel.classList.remove(HIDDEN_CLASS);
  }
});

effectLevelPin.addEventListener('mouseup', function (evt) {
  var levelPinCoordinate = evt.target.getBoundingClientRect();
  var levelLineCoordinate = effectLevelLine.getBoundingClientRect();
  var levelValue = levelPinCoordinate.x - levelLineCoordinate.x;
  var effect = document.querySelector('.effects__radio:checked');

  if (effect) {
    var filter = EFFECTS[effect.value];
    if (filter) {
      var levelPart = levelValue / levelLineCoordinate.width;
      imgUploadPreview.style.filter = getFilter(filter, levelPart);
    }
  }
});

var setImageScale = function (value) {
  scaleControlValue.value = value + '%';
  imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
};

scaleControlSmaller.addEventListener('click', function () {
  var valueResult = onScaleControlClick(MIN_SCALE, MAX_SCALE, -SCALE_STEP, scaleControlValue.value);
  setImageScale(valueResult);
});

scaleControlBigger.addEventListener('click', function () {
  var valueResult = onScaleControlClick(MIN_SCALE, MAX_SCALE, SCALE_STEP, scaleControlValue.value);
  setImageScale(valueResult);
});

bigPictureClose.addEventListener('click', function () {
  onCloseWindowClick(bigPictureEl);
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    onCloseWindowClick(bigPictureEl);
  }
});

uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove(HIDDEN_CLASS);
  document.body.classList.add('modal-open');
});

imgUploadCancel.addEventListener('click', function () {
  onCloseWindowClick(imgUploadOverlay);
  uploadFile.value = '';
  imgUploadPreview.style.transform = 'scale(1)';
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    onCloseWindowClick(imgUploadOverlay);
    uploadFile.value = '';
    imgUploadPreview.style.transform = 'scale(1)';
  }
});

imgUploadSubmit.addEventListener('click', function (evt) {
  if (imgUploadForm.checkValidity()) {
    onSetupSubmitClick(evt, imgUploadForm);
  }
});

imgUploadSubmit.addEventListener('keydown', function (evt) {
  if (imgUploadForm.checkValidity()) {
    onSetupSubmitEnterKeydown(evt, imgUploadForm);
  }
});


