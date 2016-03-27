'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:OpenstackEmailAddressCtrl
 * @description
 * # OpenstackEmailAddressCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('OpenstackEmailAddressCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

		$scope.dummyFunc2 = function(){
			alert('dummyFunc2 OpenstackEmailAddressCtrl');
		};


    });
