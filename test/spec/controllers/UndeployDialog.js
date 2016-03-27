'use strict';

describe('Controller: UndeployDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('demoApp'));

  var UndeployDialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UndeployDialogCtrl = $controller('UndeployDialogCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', inject(function () {
    expect(scope.awesomeThings.length).toBe(3);
  }));
});
