'use strict';

(function () {
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

  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  socialCommentCount.classList.add(window.utilities.HIDDEN_CLASS);
  commentsLoader.classList.add(window.utilities.HIDDEN_CLASS);

  window.comments = {
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
