//'use strict';
//
//describe('Directive: deploySteps', function () {
//
//    // load the directive's module
//    beforeEach(module('demoApp'));
//
//    var element,
//        scope;
//
//    beforeEach(inject(function ($rootScope) {
//        scope = $rootScope.$new();
//    }));
//
//    var setup = inject(function ($compile) {
//        element = angular.element('<deploy-steps></deploy-steps>');
//        element = $compile(element)(scope);
//        scope.$digest();
//    });
//
//    it('should make hidden element visible', inject(function () {
//        setup();
//        expect(element.text()).toBe('this is the deploySteps directive');
//    }));
//});
