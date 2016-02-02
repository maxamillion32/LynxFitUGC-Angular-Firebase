(function (angular) {
  'use strict';
  angular.module('lynxfit').factory('Subscription', Subscription);

  function Subscription($firebaseObject, $firebaseArray, Ref) {
    var ref = Ref.child('subscriptions');
    var service = {
      getSubscription: getSubscription,
      getWorkout:getWorkout,
      createWorkout: createWorkout,
      updateWorkout:updateWorkout,
      removeWorkout: removeWorkout
    };
    return service;

    function getSubscription(uid) {
      return $firebaseObject(ref.child(uid));
    }

    function getWorkout(uid, wid) {
      return $firebaseObject(ref.child(uid).child('workouts').child(wid));
    }

    function createWorkout(uid, workout) {
      var list = $firebaseArray(ref.child(uid).child('workouts'));
      return list.$add(workout).then(function (ref) {
        var id = ref.key();
        list.$indexFor(id); // returns location in the array
        return list;
      });
    }

    function updateWorkout(workout){
      return workout.$save();
    }

    function removeWorkout(uid, wid){
      return $firebaseObject(ref.child(uid).child('workouts').child(wid)).$remove();
    }
  }
})(angular);
