(function (angular) {
  'use strict';

  angular.module('lynxfit').directive('lfDashboardLeftMenu', lfDashboardLeftMenu);

  function lfDashboardLeftMenu() {

    var directive = {
      restrict: 'EA',
      templateUrl: 'components/directives/dashboard/left-menu.html',
      controllerAs: 'vm',
      controller: ControllerFunc,
      bindToController: true
    };

    return directive;
  }

  ControllerFunc.$inject = ['Auth'];

  function ControllerFunc(Auth) {
    var vm = this;
    vm.signout= Auth.$unauth;
    vm.user = Auth.$getAuth();
    vm.slimscrollOptions={
      height:'100%',
      disableFadeOut: true,
      distance: 0,
      size: '10px',
      railOpacity: '0.2'
    };
  }
})(angular);