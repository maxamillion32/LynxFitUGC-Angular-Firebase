(function (angular) {
  'use strict';

  angular.module('lynxfit').controller('WorkoutCreateCtrl', WorkoutCreateCtrl);

  function WorkoutCreateCtrl(SubscriptionModel, $modal,categories, $state, WORKOUT_OPTIONS) {
    var vm = this;
    vm.workoutForm = '';
    vm.categories = categories;
    vm.options=WORKOUT_OPTIONS;
    vm.workout = SubscriptionModel.attributes;
    vm.openRoundModal = openRoundModal;
    vm.openStepModal = openStepModal;
    vm.toggle = toggle;
    vm.treeOptions = {
      accept: acceptCallback
    };
    vm.removeTree=removeTree;
    vm.save = save;

    function openRoundModal(item) {
      var modalInstance = $modal.open({
        templateUrl: 'app/workout/modal-add-round/add-round.html',
        controller: 'ModalAddRoundCtrl',
        controllerAs: 'vm',
        resolve: {
          round: function () {
            if (item) {
              return item;
            }
            return SubscriptionModel.roundAttributes;
          }
        }
      });
      modalInstance.result.then(function (round) {
        if (item) {
          item = round;
        } else {
          if (!vm.workout.rounds) {
            vm.workout.rounds = [];
          }
          vm.workout.rounds.push(round);
        }
      });
    }

    function openStepModal(round, item) {
      var modalInstance = $modal.open({
        templateUrl: 'app/workout/modal-add-step/add-step.html',
        controller: 'ModalAddStepCtrl',
        controllerAs: 'vm',
        resolve: {
          step: function () {
            if (item) {
              return item;
            }
            return SubscriptionModel.stepAttributes;
          }
        }
      });
      modalInstance.result.then(function (step) {
        if (round) {
          if(item){
            item = step;
          }else{
            if (!round.steps) {
              round.steps = [];
            }
            round.steps.push(step);
          }
        }
      });
    }

    function toggle(scope) {
      scope.toggle();
    }

    function acceptCallback(sourceNodeScope, destNodesScope) {
      if(sourceNodeScope.step){
        if(destNodesScope.$nodeScope){
          return true;
        }
      }else{
        if(!destNodesScope.$nodeScope){
          return true;
        }
      }
      return false;
    }

    function removeTree(tree){
      tree.remove();
    }

    function save() {
      if (vm.workoutForm.$valid) {
        SubscriptionModel.createWorkout().then(function () {
          $state.go('dashboard.workout.list');
        });
      }
    }

  }
})(angular);