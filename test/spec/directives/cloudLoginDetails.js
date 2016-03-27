//'use strict';
//
//describe('Directive: cloudLoginDetails', function () {
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
//        element = angular.element('<div cloud-login-details></div>');
//        element = $compile(element)(scope);
//        scope.$digest();
//    });
//
//    it('should make hidden element visible', inject(function () {
//        setup();
//        expect(element.text()).toBe('this is the cloudifyLoginDetails directive');
//    }));
//});
