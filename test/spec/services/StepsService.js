'use strict';

describe('Service: StepsService', function () {

  // load the service's module
  beforeEach(module('demoApp'));

  // instantiate service
  var mStepsService;
  beforeEach(inject(function (StepsService) {
    mStepsService = StepsService;
  }));

  it('should do something', function () {
    expect(!!mStepsService).toBe(true);
  });

});
