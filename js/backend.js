'use strict';

(function () {
  var TIMEOUT = 10000;
  var ERROR_CONNECT = 'Произошла ошибка соединения';
  var ERROR_TIMELIMIT = 'Запрос не успел выполниться за ';
  var TIMELIMIT = 'мс';
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var SAVE_URL = 'https://js.dump.academy/kekstagram';
  var STATUS_ANSWER = 'Статус ответа: ';

  var request = function (URL, method, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(STATUS_ANSWER + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ERROR_CONNECT);
    });
    xhr.addEventListener('timeout', function () {
      onError(ERROR_TIMELIMIT + xhr.timeout + TIMELIMIT);
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open(method, URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    request(LOAD_URL, 'GET', null, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    request(SAVE_URL, 'POST', data, onLoad, onError);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
