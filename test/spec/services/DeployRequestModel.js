'use strict';

describe('Service: DeployRequestModel', function () {

  // load the service's module
  beforeEach(module('demoApp'));

  // instantiate service
  var mDeployRequestModel;
  beforeEach(inject(function (DeployRequestModel) {
    mDeployRequestModel = DeployRequestModel;
  }));

  it('should do something', function () {
    expect(!!mDeployRequestModel).toBe(true);
  });

});
