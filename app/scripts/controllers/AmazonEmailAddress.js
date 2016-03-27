'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:AmazonEmailAddressCtrl
 * @description
 * # AmazonEmailAddressCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('AmazonEmailAddressCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

		$scope.dummyFunc2 = function(){
			window.alert('dummyFunc2 test AmazonEmailAddressCtrl');
		};


    });
