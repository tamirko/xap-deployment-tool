'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:DatacentredEmailAddressCtrl
 * @description
 * # DatacentredEmailAddressCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('DatacentredEmailAddressCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

		$scope.dummyFunc2 = function(){
			alert('dummyFunc2 DatacentredEmailAddressCtrl');
		};


    });
