'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:HostpoolEmailAddressCtrl
 * @description
 * # HostpoolEmailAddressCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('HostpoolEmailAddressCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

		$scope.dummyFunc2 = function(){
			alert('dummyFunc2 HostpoolEmailAddressCtrl');
		};


    });
