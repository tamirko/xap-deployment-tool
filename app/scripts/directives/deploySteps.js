'use strict';

/**
 * @ngdoc directive
 * @name demoApp.directive:deploySteps
 * @description
 * # deploySteps
 */
angular.module('demoApp')
    .directive('deploySteps', function ( StepsService ) {
        return {
            templateUrl: 'views/directives/deploy_steps.html',
            restrict: 'A',
            scope:{
                'steps' : '=?deploySteps',
                'goToStep' : '&onStepChange'
            },
            link: function postLink(scope) {
                scope.isCurrentStep = StepsService.isCurrentStep;
            }
        };
    });
