(function (angular) {
  'use strict';
  angular.module('lynxfit')
    //define firebase authenticate
    .constant('FBURL', 'https://<your-fb>.firebaseio.com') // you should probably update to firebase2
    .constant('SIMPLE_LOGIN_PROVIDERS', ['google'])//'password', 'anonymous', 'facebook', 'google', 'twitter', 'github'
    .constant('loginRedirectPath', '/signin')

    //define google cloud storage settings
    .constant('GOOGLE_SETTINGS', {
      clientId: '[your id].apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.email',
      apiKey: '[YOURKEY]',
      bucket: 'lynxcontent',
      uploadPath: 'web/cover-images/',
      storageUrl: 'https://storage.googleapis.com/'
    });
})(angular);
