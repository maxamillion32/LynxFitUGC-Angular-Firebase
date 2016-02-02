(function (angular) {
  'use strict';

  angular.module('lynxfit').config(appRoute);

  function appRoute($stateProvider) {

    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: dashboardCtrlFunc
    })
      .state('dashboard.overview', {
        url: '/overview',
        templateUrl: 'app/dashboard/overview/overview.html',
        controller: 'OverviewCtrl',
        controllerAs: 'vm',
        authenticate: true
      });
    /* Add New States Above */

    function dashboardCtrlFunc($state) {
      if ($state.$current.name === 'dashboard') {
        $state.go('dashboard.overview');
      }
    }
  }

})(angular);