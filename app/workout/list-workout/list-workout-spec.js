describe('WorkoutListCtrl', function () {

  beforeEach(module('lynxfit'));

  var scope, ctrl;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('WorkoutListCtrl', {$scope: scope});
  }));

  it('should ...', inject(function () {

    expect(1).toEqual(1);

  }));

});