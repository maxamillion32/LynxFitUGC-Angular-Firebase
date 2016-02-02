(function (angular) {
  'use strict';

  angular.module('lynxfit').controller('WorkoutTemplatesCtrl', WorkoutTemplatesCtrl);

  function WorkoutTemplatesCtrl(workouts, $modal, $state) {

    var vm = this;
    vm.workouts = workouts;
    vm.cloneWorkout = cloneWorkout;

    function cloneWorkout(item) {
      var modalInstance = $modal.open({
        templateUrl: 'app/workout/modal-subscribe-workout/subscribe-workout.html',
        controller: 'ModalSubscribeWorkoutCtrl',
        resolve: {
          workout: function(){
            return item;
          },
          isCopy:function(){
            return false;
          }
        },
        controllerAs: 'vm'
      });
      modalInstance.result.then(function () {
        $state.go('dashboard.workout.list');
      });
    }

  }
})(angular);