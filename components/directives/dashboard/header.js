(function (angular) {
  'use strict';

  angular.module('lynxfit').directive('lfDashboardHeader', lfDashboardHeader);

  function lfDashboardHeader() {

    var directive = {
      restrict: 'EA',
      templateUrl: 'components/directives/dashboard/header.html',
      controllerAs: 'vm',
      controller: ControllerFunc,
      bindToController: true
    };

    return directive;
  }

  ControllerFunc.$inject = ['Auth'];

  function ControllerFunc(Auth) {
    var vm = this;
    vm.signout = Auth.$unauth;
    vm.user = Auth.$getAuth();
  }

})(angular);