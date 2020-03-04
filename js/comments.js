'use strict';

(function () {
  var FILE_EXTENSION = '.svg';
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
  var CommentCount = {
    MIN: 0,
    MAX: 5
  };
  var Avatar = {
    MIN: 1,
    MAX: 6,
    ADDRESS: 'img/avatar-'
  };
  var shownSocialCommentCount = document.querySelector('.comments-count__shown');
  var allSocialCommentCount = document.querySelector('.comments-count__all');
  var commentsLoader = document.querySelector('.comments-loader');

  var renderCommentCounter = function () {
    var allComments = document.querySelectorAll('.social__comment').length;
    var hiddenSocialComment = document.querySelectorAll('.social__comment--hidden');
    var shownComments = allComments - hiddenSocialComment.length;
    allSocialCommentCount.textContent = allComments.toString();
    shownSocialCommentCount.textContent = shownComments.toString();
  };

  var hideCommentsLoader = function () {
    var hiddenSocialComment = document.querySelectorAll('.social__comment--hidden').length;
    if (hiddenSocialComment) {
      commentsLoader.classList.remove(window.utilities.HIDDEN_CLASS);
    } else {
      commentsLoader.classList.add(window.utilities.HIDDEN_CLASS);
    }
  };

  var createComment = function (count) {
    var createNewComment = [];

    for (var i = 0; i < count; i++) {
      createNewComment.push({
        avatar: Avatar.ADDRESS + window.utilities.chooseRandomInt(Avatar.MIN, Avatar.MAX) + FILE_EXTENSION,
        message: window.utilities.chooseRandomEl(MESSAGES),
        name: window.utilities.chooseRandomEl(NAMES)
      });
    }
    return createNewComment;
  };

  var createCommentBlock = function (comments, commentTemplate) {
    var commentList = new DocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var currentComment = comments[i];
      var bigPictureCommentElement = commentTemplate.cloneNode(true);
      if (i >= CommentCount.MAX) {
        bigPictureCommentElement.classList.add('social__comment--hidden');
      }
      var bigPictureCommentsImg = bigPictureCommentElement.querySelector('.social__picture');
      var bigPictureCommentsText = bigPictureCommentElement.querySelector('.social__text');

      bigPictureCommentsImg.src = currentComment.avatar;
      bigPictureCommentsImg.alt = currentComment.name;
      bigPictureCommentsText.textContent = currentComment.message;
      commentList.appendChild(bigPictureCommentElement);
    }
    return commentList;
  };

  commentsLoader.addEventListener('click', function () {
    var hiddenSocialComment = document.querySelectorAll('.social__comment--hidden');
    Array.from(hiddenSocialComment).slice(CommentCount.MIN, CommentCount.MAX).forEach(function (item) {
      item.classList.remove('social__comment--hidden');
    });
    renderCommentCounter();
    hideCommentsLoader();
  });
  window.comments = {
    hideCommentsLoader: hideCommentsLoader,
    renderCommentCounter: renderCommentCounter,
    create: createComment,
    createBlock: createCommentBlock
  };
})();
