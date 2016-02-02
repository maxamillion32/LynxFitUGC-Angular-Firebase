(function (angular) {
  'use strict';
  angular.module('lynxfit')
    .factory('GClient', GClient)
    .factory('GAuth', GAuth)
    .factory('GStorage', GStorage);

  function GClient($document, $q, $timeout, $interval, $window) {
    var URL = 'https://apis.google.com/js/client.js';
    var LOAD_GAE_API = false;

    return {
      get: function (callback) {
        if (LOAD_GAE_API) {
          callback();
        } else {
          load(callback);
        }
      }
    };

    function loadScript(src) {
      var deferred = $q.defer();
      var script = $document[0].createElement('script');
      script.onload = function (e) {
        $timeout(function () {
          deferred.resolve(e);
        });
      };
      script.onerror = function (e) {
        $timeout(function () {
          deferred.reject(e);
        });
      };
      script.src = src;
      $document[0].body.appendChild(script);
      return deferred.promise;
    }

    function load(callback) {
      loadScript(URL).then(function () {
        var isok = function (callback) {
          if ($window.gapi.client !== undefined) {
            callback();
            $interval.cancel(check);
          }
        };
        isok(callback);
        var check = $interval(function () {
          isok(callback);
        }, 10);
        LOAD_GAE_API = true;
      });
    }
  }

  function GAuth($q, GClient, $window, $location, GOOGLE_SETTINGS) {
    var isLoad = false;

    var CLIENT_ID = GOOGLE_SETTINGS.clientId;
    var SCOPE = GOOGLE_SETTINGS.scope;
    var RESPONSE_TYPE = 'token id_token';

    return {
      load: function (callback) {
        var args = arguments.length;
        GClient.get(function () {
          $window.gapi.client.load('oauth2', 'v2', function () {
            if (args === 1) {
              callback();
            }
          });
        });

      },

      checkAuth: function () {
        var deferred = $q.defer();
        signin(true, function (resp) {
          deferred.resolve(resp);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },

      login: function () {
        var deferred = $q.defer();
        signin(false, function (resp) {
          deferred.resolve(resp);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      },

      setToken: function (token) {
        var deferred = $q.defer();
        load(function () {
          $window.gapi.auth.setToken(token);
          getUser().then(function () {
            deferred.resolve();
          }, function () {
            deferred.reject();
          });
        });
        return deferred.promise;
      },

      getToken: function () {
        var deferred = $q.defer();
        load(function () {
          deferred.resolve($window.gapi.auth.getToken());
        });
        return deferred.promise;
      },

      logout: function () {
        var deferred = $q.defer();
        load(function () {
          $window.gapi.auth.setToken(null);
          deferred.resolve();
        });
        return deferred.promise;
      },

      offline: function () {
        var deferred = $q.defer();
        offline().then(function (code) {
          deferred.resolve(code);
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      }
    };

    function load(callback) {
      if (isLoad === false) {
        var args = arguments.length;
        GClient.get(function () {
          $window.gapi.client.load('oauth2', 'v2', function () {
            isLoad = true;
            if (args === 1) {
              callback();
            }
          });
        });
      } else {
        callback();
      }
    }

    function signin(mode, authorizeCallback) {
      load(function () {
        $window.gapi.auth.authorize({
          client_id: CLIENT_ID,
          scope: SCOPE,
          immediate: mode,
          response_type: RESPONSE_TYPE
        }, authorizeCallback);
      });
    }

    function offline() {
      var deferred = $q.defer();
      var origin = $location.protocol + "//" + $location.hostname;
      if ($location.port !== "") {
        origin = origin + ':' + $location.port;
      }
      var win = $window.open('https://accounts.google.com/o/oauth2/auth?scope=' + encodeURI(SCOPE) + '&redirect_uri=postmessage&response_type=code&client_id=' + CLIENT_ID + '&access_type=offline&approval_prompt=force&origin=' + origin, null, 'width=800, height=600');

      $window.addEventListener("message", getCode);

      function getCode(event) {
        if (event.origin === "https://accounts.google.com") {
          var data = JSON.parse(event.data);
          $window.removeEventListener("message", getCode);
          data = gup(data.a[0], 'code');
          if (data === undefined) {
            deferred.reject();
          } else {
            deferred.resolve(data);
          }
        }
      }

      function gup(url, name) {
        name = name.replace(/[[]/, "\[").replace(/[]]/, "\]");
        var regexS = name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        if (results === null) {
          return undefined;
        } else {
          return results[1];
        }
      }

      return deferred.promise;
    }

    function getUser() {
      var deferred = $q.defer();
      $window.gapi.client.oauth2.userinfo.get().execute(function (resp) {
        if (!resp.code) {
          deferred.resolve(resp);
        } else {
          deferred.reject();
        }
      });
      return deferred.promise;
    }

    function setToken(token) {
      var deferred = $q.defer();
      load(function () {
        $window.gapi.auth.init({
          client_id: '559798132783-hm3gc0lj0rups45i35m7mp4s88u7321o.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/devstorage.full_control'
        });
        $window.gapi.auth.setToken(token);
        getUser().then(function () {
          deferred.resolve();
        }, function () {
          deferred.reject();
        });
      });
      return deferred.promise;
    }
  }

  function GStorage($window, GClient, $q, GOOGLE_SETTINGS) {
    var API_VERSION = 'v1';
    var API_KEY = GOOGLE_SETTINGS.apiKey;
    var BUCKET = GOOGLE_SETTINGS.bucket;
    var UPLOAD_PATH = GOOGLE_SETTINGS.uploadPath;

    var isLoad = false;

    var service = {
      createObject: createObject
    };
    return service;


    function load(callback) {
      if (isLoad === false) {
        var args = arguments.length;
        GClient.get(function () {
          $window.gapi.client.setApiKey(API_KEY);
          $window.gapi.client.load('storage', 'v1', function () {
            isLoad = true;
            if (args === 1) {
              callback();
            }
          });
        });
      } else {
        callback();
      }
    }

    function createObject(fileData) {
      var deferred = $q.defer();
      load(function () {
        var fileReader = new FileReader();
        fileReader.readAsBinaryString(fileData.file);
        fileReader.onload = function (event) {
          var boundary = '-------314159265358979323846';
          var delimiter = "\r\n--" + boundary + "\r\n";
          var close_delim = "\r\n--" + boundary + "--";

          //set file name unique and return filename after uploaded
          var filename=new Date().getTime() + '-'+fileData.name;
          var contentType = fileData.file.type || 'application/octet-stream';
          var metadata = {
            'name': UPLOAD_PATH + filename,
            'mimeType': contentType
          };

          var base64Data = btoa(event.target.result);
          var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;

          //Note: gapi.client.storage.objects.insert() can only insert
          //small objects (under 64k) so to support larger file sizes
          //we're using the generic HTTP request method gapi.client.request()
          var request = $window.gapi.client.request({
            'path': '/upload/storage/' + API_VERSION + '/b/' + BUCKET + '/o',
            'method': 'POST',
            'params': {
              'uploadType': 'multipart',
              'predefinedAcl': 'publicRead'
            },
            'headers': {
              'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody
          });

          request.execute(function (response) {
            if (response.error) {
              deferred.reject(response.error);
            } else {
              deferred.resolve(filename);
            }
          });
        };
      });
      return deferred.promise;
    }
  }

})(angular);