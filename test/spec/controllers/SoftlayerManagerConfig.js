'use strict';

describe('Controller: SoftlayerManagerConfigCtrl', function () {

  // load the controller's module
  beforeEach(module('demoApp'));

  var SoftlayerManagerConfigCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SoftlayerManagerConfigCtrl = $controller('SoftlayerManagerConfigCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', inject(function () {
    expect(scope.awesomeThings.length).toBe(3);
  }));
});
