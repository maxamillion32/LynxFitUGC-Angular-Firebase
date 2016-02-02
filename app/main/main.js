(function (angular) {
  'use strict';
  angular.module('lynxfit').config(appRoute);

  function appRoute($stateProvider) {

    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'app/main/home/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'vm'
    });
    /* Add New States Above */

  }
})(angular);