(function (angular) {
  'use strict';

  angular.module('lynxfit').controller('WorkoutListCtrl', WorkoutListCtrl);

  function WorkoutListCtrl(Subscription, Auth, subscription, $modal) {
    var vm = this;
    vm.workouts = angular.copy(subscription.workouts);
    vm.cloneWorkout = cloneWorkout;
    vm.removeWorkout=removeWorkout;

    function cloneWorkout(item) {
      var modalInstance = $modal.open({
        templateUrl: 'app/workout/modal-subscribe-workout/subscribe-workout.html',
        controller: 'ModalSubscribeWorkoutCtrl',
        resolve: {
          workout: function(){
            return item;
          },
          isCopy:function(){
            return true;
          }
        },
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (workouts) {
        vm.workouts=angular.copy(workouts);
      });
    }

    function removeWorkout(wid){
      Subscription.removeWorkout(Auth.$getAuth().uid, wid).then(function(){
        delete vm.workouts[wid];
      });
    }
  }
})(angular);