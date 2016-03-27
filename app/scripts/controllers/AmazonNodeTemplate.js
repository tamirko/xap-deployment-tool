'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:AmazonNodeTemplateCtrl
 * @description
 * # AmazonNodeTemplateCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('AzureNodeTemplateCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

        $scope.uploadBlueprint = true;
        $scope.toggleUploadBlueprint = function(){
            $scope.uploadBlueprint = !$scope.uploadBlueprint;
            if ( !$scope.deployApplication ) {
                $scope.deployApplication = true;
            }
        };

        $scope.need2UploadBlueprint = function(){
            return $scope.uploadBlueprint;
        };

        $scope.deployApplication = true;
        $scope.toggleDeployApplication = function(){
            $scope.deployApplication = !$scope.deployApplication;
            if ( !$scope.uploadBlueprint ) {
                $scope.uploadBlueprint = true;
            }
        };

        $scope.need2DeployApplication = function(){
            return $scope.deployApplication;
        };

        $scope.nodeTemplates = [{}];


		$scope.addNodeTemplate = function(){
            $scope.nodeTemplates.push({});
		};

		$scope.removeNodeTemplate = function( $index ){
			$scope.nodeTemplates.splice($index,1);
		};

        $scope.applied2All = false;
        $scope.toggleApply2All = function(){
            $scope.applied2All = !$scope.applied2All;
        };

        $scope.apply2AllIsEnabled = function(){
            return $scope.applied2All;
        };

        $scope.canApplyToAll = function(){
            return $scope.nodeTemplates.length === 1;
        };

		$scope.canAddNodeTemplate = function(){
			return $scope.nodeTemplates.length < 100;
		};

		$scope.canRemoveNodeTemplate = function( ){
			return $scope.nodeTemplates.length > 1;
		};

		$scope.vmsoss = [
		       {
                  'id': '4174',
                  'label': 'Ubuntu Linux 12.04 LTS Precise Pangolin - Minimal Install (64 bit)'
               },
               {
				  'id': '4668',
                  'label': 'Ubuntu Linux 14.04 LTS Trusty Tahr - Minimal Install (64 bit)'
			   },
               {
				  'id': '4248',
                  'label': 'WINDOWS 2008 FULL STD 64 BIT R2 SP1'
			   },
               {
				  'id': '5952',
                  'label': 'CentOS 7.x - Minimal Install (64 bit)'
			   },
               {
				  'id': '3908',
                  'label': 'CentOS 6.x - Minimal Install (64 bit)'
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
