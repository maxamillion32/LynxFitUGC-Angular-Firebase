(function (angular) {
  'use strict';
  angular.module('lynxfit').factory('Workout', Workout);

  function Workout($firebaseArray, Ref) {
    var ref=Ref.child('workouts');
    var service={
      getWorkoutTemplates:getWorkoutTemplates
    };
    return service;

    function getWorkoutTemplates(){
      return $firebaseArray(ref);
    }
  }
})(angular);
