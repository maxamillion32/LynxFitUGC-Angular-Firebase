(function (angular) {
  'use strict';

  angular.module('lynxfit').controller('ModalAddRoundCtrl', ModalAddRoundCtrl);

  function ModalAddRoundCtrl($modalInstance, round) {
    var vm = this;
    vm.roundForm='';
    vm.round=angular.copy(round);
    vm.save = save;
    vm.cancel = cancel;

    function save() {
      if(vm.roundForm.$valid){
        $modalInstance.close(vm.round);
      }
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

  }
})(angular);