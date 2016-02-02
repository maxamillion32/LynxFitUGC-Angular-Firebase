(function (angular) {
  'use strict';

  angular.module('lynxfit').controller('SigninCtrl', SigninCtrl);

  function SigninCtrl(Auth, $state, GAuth) {
    var vm = this;
    vm.oauthLogin = oauthLogin;

    function oauthLogin() {
      vm.err = null;
      GAuth.login().then(function (res) {
        Auth.$authWithOAuthToken('google', res.access_token).then(redirect, showError);
      });
    }

    function redirect() {
      $state.go('dashboard.overview');
    }

    function showError(err){
      vm.err = err;
    }

  }
})(angular);