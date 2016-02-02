(function (angular) {
  'use strict';
  angular.module('lynxfit')
    .constant('WORKOUT_OPTIONS', {
      //define workout options, for dropdown or list data
      difficultyLevels: [
        {label: 'Beginner', value: 'Beginner'},
        {label: 'Intermediate', value: 'Intermediate'},
        {label: 'Advanced', value: 'Advanced'}
      ]
    });
})(angular);