'use strict';

(function () {
  var Comment = {
    MIN: 0,
    MAX: 5
  };
  var Avatar = {
    MIN: 1,
    MAX: 6,
    ADDRESS: 'img/avatar-'
  };
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
  var shownSocialCommentCount = document.querySelector('.comments-count__shown');
  var allSocialCommentCount = document.querySelector('.comments-count__all');
  var commentsLoader = document.querySelector('.comments-loader');

  commentsLoader.addEventListener('click', function () {
    var hiddenSocialComment = document.querySelectorAll('.social__comment--hidden');
    Array.from(hiddenSocialComment).slice(Comment.MIN, Comment.MAX).forEach(function (item) {
      item.classList.remove('social__comment--hidden');
    });
    renderCommentCounter();
    showHiddenComment();
  });

  var renderCommentCounter = function () {
    var allComments = document.querySelectorAll('.social__comment').length;
    var hiddenSocialComment = document.querySelectorAll('.social__comment--hidden');
    var shownComments = allComments - hiddenSocialComment.length;
    allSocialCommentCount.textContent = allComments.toString();
    shownSocialCommentCount.textContent = shownComments.toString();
  };

  var showHiddenComment = function () {
    var hiddenSocialComment = document.querySelectorAll('.social__comment--hidden').length;
    if (hiddenSocialComment) {
      commentsLoader.classList.remove(window.utilities.HIDDEN_CLASS);
    } else {
      commentsLoader.classList.add(window.utilities.HIDDEN_CLASS);
    }
  };

  window.comments = {
    showHiddenComment: showHiddenComment,
    renderCommentCounter: renderCommentCounter,

    create: function (count) {
      var createNewComment = [];

      for (var j = 0; j < count; j++) {
        createNewComment.push({
          avatar: Avatar.ADDRESS + window.utilities.chooseRandomInt(Avatar.MIN, Avatar.MAX) + FILE_EXTENSION,
          message: window.utilities.chooseRandomEl(MESSAGES),
          name: window.utilities.chooseRandomEl(NAMES)
        });
      }
      return createNewComment;
    },

    createBlock: function (comments, commentTemplate) {
      var commentList = new DocumentFragment();

      for (var i = 0; i < comments.length; i++) {
        var currentComment = comments[i];
        var bigPictureCommentElement = commentTemplate.cloneNode(true);
        if (i >= Comment.MAX) {
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
    }
  };
})();
