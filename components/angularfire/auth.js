(function (angular) {
  'use strict';
  angular.module('lynxfit').factory('Auth', Auth);

  function Auth($firebaseAuth, Ref, GAuth) {
    var authObj=$firebaseAuth(Ref);
    authObj.$onAuth(onAuthCallback);
    return authObj;

    function onAuthCallback(authData){
      if(authData){
        if(authData.provider==='google'){
          authData.name=authData.google.displayName;
          authData.image=authData.google.profileImageURL;

          GAuth.checkAuth().then(function(){},function(){
            authObj.$unauth();
          });
        }
      }else{
        GAuth.logout();
      }
    }
  }
})(angular);
