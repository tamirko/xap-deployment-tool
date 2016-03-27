'use strict';

describe('Controller: AmazonGeneralDataCtrl', function () {

  // load the controller's module
  beforeEach(module('demoApp'));

  var AmazonGeneralDataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AmazonGeneralDataCtrl = $controller('AmazonGeneralDataCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', inject(function () {
    expect(scope.awesomeThings.length).toBe(3);
  }));
});
