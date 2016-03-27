'use strict';

describe('Service: DeploymentToolClient', function () {

  // load the service's module
  beforeEach(module('demoApp'));

  // instantiate service
  var mDeploymentToolClient;
  beforeEach(inject(function (DeploymentToolClient) {
    mDeploymentToolClient = DeploymentToolClient;
  }));

  it('should do something', function () {
    expect(!!mDeploymentToolClient).toBe(true);
  });

});
