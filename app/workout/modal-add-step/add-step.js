(function (angular) {
  'use strict';

  angular.module('lynxfit').controller('ModalAddStepCtrl', ModalAddStepCtrl);

  function ModalAddStepCtrl($modalInstance, step) {
    var vm = this;
    vm.stepForm='';
    vm.step=angular.copy(step);
    vm.save = save;
    vm.cancel = cancel;

    function save() {
      if(vm.stepForm.$valid){
        $modalInstance.close(vm.step);
      }
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

  }
})(angular);