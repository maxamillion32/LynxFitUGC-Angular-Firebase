(function (angular) {
  'use strict';

  angular.module('lynxfit', [
    'ui.bootstrap',
    'ui.utils',
    'ui.router',
    'ngAnimate',
    'firebase',
    'angular-confirm',
    'ngMessages',
    'ui.tree',
    'flow',
    'ngScrollSpy',
    'ui.slimscroll'
  ])
    .config(configure)
    .run(runBlock);

  function configure($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false});
    // setup state provider
    $urlRouterProvider.otherwise('/');
  }

  function runBlock($rootScope, $location, Auth, loginRedirectPath) {

    $rootScope.safeApply = safeApply;
    $rootScope.$on('$stateChangeStart', stateChangeStart);

    function safeApply(fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    }

    function stateChangeStart(event, toState) {
      // Redirect to login if route requires auth and you're not logged in
      if (toState.authenticate) {
        Auth.$onAuth(check);
      }
    }

    function check(user) {
      if(!user) {
        $location.path(loginRedirectPath);
      }
    }
  }
})(angular);