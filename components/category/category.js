(function (angular) {
  'use strict';
  angular.module('lynxfit').factory('Categories', Categories);

  function Categories( $firebaseArray, Ref) {
    var ref=Ref.child('categories');

    var service={
      getCategories:getCategories
    };
    return service;

    function getCategories(){
      return $firebaseArray(ref);
    }
  }
})(angular);

