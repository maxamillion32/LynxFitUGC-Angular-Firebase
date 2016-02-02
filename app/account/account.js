(function (angular) {
  'use strict';

  angular.module('lynxfit').config(appRoute);

  function appRoute($stateProvider) {

    $stateProvider.state('signin', {
      url: '/signin',
      templateUrl: 'app/account/signin/signin.html',
      controller: 'SigninCtrl',
      controllerAs: 'vm'
    });
    $stateProvider.state('signup', {
      url: '/signup',
      templateUrl: 'app/account/signup/signup.html',
      controller: 'SignupCtrl',
      controllerAs: 'vm'
    });
    /* Add New States Above */

  }

})(angular);