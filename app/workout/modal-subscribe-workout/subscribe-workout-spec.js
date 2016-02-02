describe('WorkouttemplatesCtrl', function () {

  beforeEach(module('lynxfit'));

  var scope, ctrl;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('ModalSubscribeWorkoutCtrl', {$scope: scope});
  }));

  it('should ...', inject(function () {

    expect(1).toEqual(1);

  }));

});