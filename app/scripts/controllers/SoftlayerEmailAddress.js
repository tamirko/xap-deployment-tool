'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:SoftlayerEmailAddressCtrl
 * @description
 * # SoftlayerEmailAddressCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('AzureEmailAddressCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

		$scope.dummyFunc2 = function(){
			alert('dummyFunc2 AzureEmailAddressCtrl');
		};


    });
