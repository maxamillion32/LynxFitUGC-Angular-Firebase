(function (angular) {
  'use strict';

  angular.module('lynxfit').controller('ModalSubscribeWorkoutCtrl', ModalSubscribeWorkoutCtrl);

  function ModalSubscribeWorkoutCtrl(Subscription, Auth, $modalInstance, workout) {
    var vm = this;
    vm.subscribeForm = '';
    vm.workout = angular.copy(workout);
    vm.workout.name = 'Copy of ' + vm.workout.name;
    vm.save = save;
    vm.cancel = cancel;

    function save() {
      if (vm.subscribeForm.$valid) {
        var workouts = Subscription.createWorkout(Auth.$getAuth().uid, vm.workout);
        workouts.then(function () {
          $modalInstance.close(workouts);
        });
      }
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

  }
})(angular);