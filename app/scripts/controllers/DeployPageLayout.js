'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:DeployPageLayoutCtrl
 * @description
 * # DeployPageLayoutCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('DeployPageLayoutCtrl', function ($scope, StepsService ) {

        $scope.hasNextStep = StepsService.hasNextStep;
        $scope.hasPreviousStep = StepsService.hasPreviousStep;
        $scope.nextStep = StepsService.nextStep;
        $scope.previousStep = StepsService.previousStep;

    });
