(function (angular) {
  'use strict';
  angular.module('lynxfit')
    //define firebase authenticate
    .constant('FBURL', 'https://lynxplus.firebaseio.com')
    .constant('SIMPLE_LOGIN_PROVIDERS', ['google'])//'password', 'anonymous', 'facebook', 'google', 'twitter', 'github'
    .constant('loginRedirectPath', '/signin')

    //define google cloud storage settings
    .constant('GOOGLE_SETTINGS', {
      clientId: '559798132783-hm3gc0lj0rups45i35m7mp4s88u7321o.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.email',
      apiKey: '[YOURKEY]',
      bucket: 'lynxcontent',
      uploadPath: 'web/cover-images/',
      storageUrl: 'https://storage.googleapis.com/'
    });
})(angular);
