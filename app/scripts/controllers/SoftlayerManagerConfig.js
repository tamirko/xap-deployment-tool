'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:SoftlayerManagerConfigCtrl
 * @description
 * # SoftlayerManagerConfigCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('SoftlayerManagerConfigCtrl', function ($scope) {
		$scope.usingExistingManager = false;

		$scope.useExistingManager = function(){
			$scope.usingExistingManager = true;
		};

		$scope.bootstrapNewManager = function(){
			$scope.usingExistingManager = false;
		};


		$scope.need2bootstrap = function(){
			return !($scope.usingExistingManager);
		};

		$scope.oss = [
		       {
				  'id': '4668',
                  'label': 'Ubuntu Linux 14.04 LTS Trusty Tahr - Minimal Install (64 bit)'
			   },
               {
				  'id': '5952',
                  'label': 'CentOS 7.x - Minimal Install (64 bit)'
			   }
		];

		$scope.cpus = [
		       {
                  'id': '860',
                  'label': '8 x 2.0 GHz Cores'
               },
               {
				  'id': '1198',
                  'label': '12 x 2.0 GHz Cores'
			   },
               {
				  'id': '1194',
                  'label': '16 x 2.0 GHz Cores'
			   }
		];

		$scope.memories = [
		       {
                  'id': '864',
                  'label': '8 GB'
               },
               {
				  'id': '1017',
                  'label': '16 GB'
			   },
               {
				  'id': '1155',
                  'label': '32 GB'
			   }
		];

		$scope.portspeeds = [
		       {
                  'id': '187',
                  'label': '100 Mbps Public & Private Network Uplinks'
               },
               {
				  'id': '497',
                  'label': '100 Mbps Private Network Uplink'
			   },
               {
				  'id': '188',
                  'label': '1 Gbps Public & Private Network Uplinks'
			   }
		];

        $scope.disks =  [ //cci
                {
                    'id': '1178',
                    'label': '25 GB SAN',
                    'size': 25
                },
                {
                    'id': '865',
                    'label': '100 GB SAN',
                    'size': 100
                }];
    });
