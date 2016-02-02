(function (angular) {
  'use strict';

  angular.module('lynxfit').filter('lfSrc', lfSrc);

  function lfSrc(GOOGLE_SETTINGS) {
    return filter;

    function filter(src, type) {
      var setting = GOOGLE_SETTINGS;
      if (type === 'coverImage') {
        src = setting.storageUrl + setting.bucket + '/' + setting.uploadPath + src;
      }
      return src;
    }
  }

})(angular);