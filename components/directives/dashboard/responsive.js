(function (angular, $) {
  'use strict';

  angular.module('lynxfit').directive('lfDashboardResponsive', lfDashboardResponsive);

  function lfDashboardResponsive() {

    var directive = {
      restrict: 'EA',
      link: LinkFunc
    };

    return directive;

    function LinkFunc(scope) {
      $('html').addClass('app');
      scope.$on('$destroy', function () {
        $('html').removeClass('app');
      });
    }
  }
})(angular, $);