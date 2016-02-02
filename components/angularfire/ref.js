(function (angular) {
  'use strict';
  angular.module('lynxfit').factory('Ref', Ref);

  function Ref($window, FBURL) {
    return new $window.Firebase(FBURL);
  }
})(angular);