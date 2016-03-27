'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:AzureManagerConfigCtrl
 * @description
 * # AzureManagerConfigCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('AzureManagerConfigCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

        if ( $scope.data.usingExistingManager == undefined ) {
            $scope.data.usingExistingManager = false;
        }
        $scope.toggleExistingManager = function(){
            $scope.data.usingExistingManager = !$scope.data.usingExistingManager;
            if ( $scope.data.usingExistingManager ) {
                $scope.data.freezeManagerOnFailure = false;
                $scope.data.existingMngrIPaddress = "";
            }
        };
        $scope.need2UseExistingManager = function(){
            return $scope.data.usingExistingManager;
        };

        $scope.data.freezeManagerOnFailure = false;
        $scope.toggleFreezeManager = function(){
            $scope.data.freezeManagerOnFailure = !$scope.data.freezeManagerOnFailure;
        };

        $scope.need2FreezeManager = function(){
            return $scope.data.freezeManagerOnFailure;
        };

        $scope.data.useExistingResourceGroup = false;
        $scope.toggleExistingResourceGroup = function(){
            $scope.data.useExistingResourceGroup = !$scope.data.useExistingResourceGroup;
        };

        $scope.existingResourceGroupIsEnabled = function(){
            return $scope.data.useExistingResourceGroup;
        };

        $scope.data.useExistingStorageAccount = false;
        $scope.toggleExistingStorageAccount = function(){
            $scope.data.useExistingStorageAccount = !$scope.data.useExistingStorageAccount;
        };

        $scope.existingStorageAccountIsEnabled = function(){
            return $scope.data.useExistingStorageAccount;
        };

        $scope.data.useExistingVnet = false;
        $scope.toggleExistingVnet = function(){
            $scope.data.useExistingVnet = !$scope.data.useExistingVnet;
        };

        $scope.existingVnetIsEnabled = function(){
            return $scope.data.useExistingVnet;
        };


        $scope.data.useExistingSubnet = false;
        $scope.toggleExistingSubnet = function(){
            $scope.data.useExistingSubnet = !$scope.data.useExistingSubnet;
        };

        $scope.existingSubnetIsEnabled = function(){
            return $scope.data.useExistingSubnet;
        };

        //Set it t false later
        $scope.data.useExistingSecurityGroup = true;
        $scope.toggleExistingSecurityGroup = function(){
            // Remove this comment later
            //$scope.data.useExistingSecurityGroup = !$scope.data.useExistingSecurityGroup;
        };

        $scope.existingSecurityGroupIsEnabled = function(){
            return $scope.data.useExistingSecurityGroup;
        };


        $scope.azureoss =  [
			{ 'label': 'CentOs 7', 'id': 'OpenLogic,CentOs,7.0'},
			{ 'label': 'Ubuntu 14.04.2-LTS','id': 'Canonical,UbuntuServer,14.04.2-LTS'},
			{ 'label': 'Ubuntu 12.04.5-LTS','id': 'Canonical,UbuntuServer,12.04.5-LTS'}
		];

		$scope.vmsizes =  [
			{ 'id' : 'basic_A0', 'label':  'Basic_A0 - Cores:1, RAM:0.75 GB, OsDisk:20 GB'},
			{ 'id' : 'Basic_A1', 'label':  'Basic_A1 - Cores:1, RAM:1.75 GB, OsDisk:40 GB'},
			{ 'id' : 'Basic_A2', 'label':  'Basic_A2 - Cores:2, RAM:3.5 GB, OsDisk:60 GB'},
			{ 'id' : 'Basic_A3', 'label':  'Basic_A3 - Cores:4, RAM:7 GB, OsDisk:120 GB'},
			{ 'id' : 'Basic_A4', 'label':  'Basic_A4 - Cores:8, RAM:14 GB, OsDisk:240 GB'},
			{ 'id' : 'standard_A1', 'label':  'Standard_A1 - Cores:1, RAM:1.75 GB, OsDisk:70 GB'},
			{ 'id' : 'Standard_A2', 'label':  'Standard_A2 - Cores:2, RAM:3.5 GB, OsDisk:135 GB'},
			{ 'id' : 'Standard_A3', 'label':  'Standard_A3 - Cores:4, RAM:7 GB, OsDisk:285 GB'},
			{ 'id' : 'Standard_A4', 'label':  'Standard_A4 - Cores:8, RAM:14 GB, OsDisk:605 GB'},
			{ 'id' : 'Standard_A5', 'label':  'Standard_A5 - Cores:2, RAM:14 GB, OsDisk:135 GB'},
			{ 'id' : 'Standard_A6', 'label':  'Standard_A6 - Cores:4, RAM:28 GB, OsDisk:285 GB'},
			{ 'id' : 'Standard_A7', 'label':  'Standard_A7 - Cores:8, RAM:56 GB, OsDisk:605 GB'},
			{ 'id' : 'optimized_D1', 'label':  'Optimized_D1 - Cores:1, RAM:3.5 GB, OsDisk:50 GB'},
			{ 'id' : 'Optimized_D2', 'label':  'Optimized_D2 - Cores:2, RAM:7 GB, OsDisk:100 GB'},
			{ 'id' : 'Optimized_D3', 'label':  'Optimized_D3 - Cores:4, RAM:14 GB, OsDisk:200 GB'},
			{ 'id' : 'Optimized_D4', 'label':  'Optimized_D4 - Cores:8, RAM:28 GB, OsDisk:400 GB'},
			{ 'id' : 'Optimized_D11', 'label':  'Optimized_D11 - Cores:2, RAM:14 GB, OsDisk:100 GB'},
			{ 'id' : 'Optimized_D12', 'label':  'Optimized_D12 - Cores:4, RAM:28 GB, OsDisk:200 GB'},
			{ 'id' : 'Optimized_D13', 'label':  'Optimized_D13 - Cores:8, RAM:56 GB, OsDisk:400 GB'},
			{ 'id' : 'Optimized_D14', 'label':  'Optimized_D14 - Cores:16, RAM:112 GB, OsDisk:800 GB'},
			{ 'id' : 'Optimized_D1 v2', 'label':  'Optimized_D1 v2 - Cores:1, RAM:3.5 GB, OsDisk:50 GB'},
			{ 'id' : 'Optimized_D2 v2', 'label':  'Optimized_D2 v2 - Cores:2, RAM:7 GB, OsDisk:100 GB'},
			{ 'id' : 'Optimized_D3 v2', 'label':  'Optimized_D3 v2 - Cores:4, RAM:14 GB, OsDisk:200 GB'},
			{ 'id' : 'Optimized_D4 v2', 'label':  'Optimized_D4 v2 - Cores:8, RAM:28 GB, OsDisk:400 GB'},
			{ 'id' : 'Optimized_D5 v2', 'label':  'Optimized_D5 v2 - Cores:16, RAM:56 GB, OsDisk:800 GB'},
			{ 'id' : 'Optimized_D11 v2', 'label':  'Optimized_D11 v2 - Cores:2, RAM:14 GB, OsDisk:100 GB'},
			{ 'id' : 'Optimized_D12 v2', 'label':  'Optimized_D12 v2 - Cores:4, RAM:28 GB, OsDisk:200 GB'},
			{ 'id' : 'Optimized_D13 v2', 'label':  'Optimized_D13 v2 - Cores:8, RAM:56 GB, OsDisk:400 GB'},
			{ 'id' : 'Optimized_D14 v2', 'label':  'Optimized_D14 v2 - Cores:16, RAM:112 GB, OsDisk:800 GB'},
			{ 'id' : 'Optimized_G1', 'label':  'Optimized_G1 - Cores:2, RAM:28 GB, OsDisk:384 GB'},
			{ 'id' : 'Optimized_G2', 'label':  'Optimized_G2 - Cores:4, RAM:56 GB, OsDisk:768 GB'},
			{ 'id' : 'Optimized_G3', 'label':  'Optimized_G3 - Cores:8, RAM:112 GB, OsDisk:1,536 GB'},
			{ 'id' : 'Optimized_G4', 'label':  'Optimized_G4 - Cores:16, RAM:224 GB, OsDisk:3,072 GB'},
			{ 'id' : 'Optimized_G5', 'label':  'Optimized_G5 - Cores:32, RAM:448 GB, OsDisk:6,144 GB'}
		];

    });
