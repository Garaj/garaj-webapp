'use strict';

describe('Controller: SponsorsCtrl', function () {

  // load the controller's module
  beforeEach(module('garajApp'));

  var SponsorsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SponsorsCtrl = $controller('SponsorsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
