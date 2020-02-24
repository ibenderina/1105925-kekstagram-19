'use strict';

(function () {
  var TIMEOUT = 10000;
  var ERROR_CONNECT = 'Произошла ошибка соединения';
  var ERROR_TIMELIMIT = 'Запрос не успел выполниться за ';
  var TIMELIMIT = 'мс';
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var SAVE_URL = 'https://js.dump.academy/kekstagram';
  var STATUS_ANSWER = 'Статус ответа: ';

  var request = function (URL, method, onLoad, onError) {
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
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = request(LOAD_URL, 'GET', onLoad, onError);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = request(SAVE_URL, 'POST', onLoad, onError);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
