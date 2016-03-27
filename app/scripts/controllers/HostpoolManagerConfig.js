'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:HostpoolManagerConfigCtrl
 * @description
 * # HostpoolManagerConfigCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('HostpoolManagerConfigCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

        if ( $scope.data.usingExistingManager == undefined ) {
            $scope.data.usingExistingManager = false;
        }
        $scope.toggleExistingManager = function(){
            $scope.usingExistingManager = !$scope.usingExistingManager;
            if ( $scope.usingExistingManager ) {
                $scope.freezeManagerOnFailure = false;
            }
        };
        $scope.need2UseExistingManager = function(){
            return $scope.usingExistingManager;
        };

        $scope.freezeManagerOnFailure = false;
        $scope.toggleFreezeManager = function(){
            $scope.freezeManagerOnFailure = !$scope.freezeManagerOnFailure;
        };

        $scope.need2FreezeManager = function(){
            return $scope.freezeManagerOnFailure;
        };

        $scope.azureoss =  [
			{ 'label': 'CentOs 7', 'id': 'OpenLogic,CentOs,7.0'},
			{ 'label': 'Ubuntu 14.04.2-LTS','id': 'Canonical,UbuntuServer,14.04.2-LTS'},
			{ 'label': 'Ubuntu 12.04.5-LTS','id': 'Canonical,UbuntuServer,12.04.5-LTS'}
		];

		$scope.vmsizes =  [
			{ 'id' : 'basic_A0', 'label':  'Basic_A0 - Cores:1, RAM:0.75 GB, Disk:20 GB'},
			{ 'id' : 'Basic_A1', 'label':  'Basic_A1 - Cores:1, RAM:1.75 GB, Disk:40 GB'},
			{ 'id' : 'Basic_A2', 'label':  'Basic_A2 - Cores:2, RAM:3.5 GB, Disk:60 GB'},
			{ 'id' : 'Basic_A3', 'label':  'Basic_A3 - Cores:4, RAM:7 GB, Disk:120 GB'},
			{ 'id' : 'Basic_A4', 'label':  'Basic_A4 - Cores:8, RAM:14 GB, Disk:240 GB'},
			{ 'id' : 'standard_A1', 'label':  'Standard_A1 - Cores:1, RAM:1.75 GB, Disk:70 GB'},
			{ 'id' : 'Standard_A2', 'label':  'Standard_A2 - Cores:2, RAM:3.5 GB, Disk:135 GB'},
			{ 'id' : 'Standard_A3', 'label':  'Standard_A3 - Cores:4, RAM:7 GB, Disk:285 GB'},
			{ 'id' : 'Standard_A4', 'label':  'Standard_A4 - Cores:8, RAM:14 GB, Disk:605 GB'},
			{ 'id' : 'Standard_A5', 'label':  'Standard_A5 - Cores:2, RAM:14 GB, Disk:135 GB'},
			{ 'id' : 'Standard_A6', 'label':  'Standard_A6 - Cores:4, RAM:28 GB, Disk:285 GB'},
			{ 'id' : 'Standard_A7', 'label':  'Standard_A7 - Cores:8, RAM:56 GB, Disk:605 GB'},
			{ 'id' : 'optimized_D1', 'label':  'Optimized_D1 - Cores:1, RAM:3.5 GB, Disk:50 GB'},
			{ 'id' : 'Optimized_D2', 'label':  'Optimized_D2 - Cores:2, RAM:7 GB, Disk:100 GB'},
			{ 'id' : 'Optimized_D3', 'label':  'Optimized_D3 - Cores:4, RAM:14 GB, Disk:200 GB'},
			{ 'id' : 'Optimized_D4', 'label':  'Optimized_D4 - Cores:8, RAM:28 GB, Disk:400 GB'},
			{ 'id' : 'Optimized_D11', 'label':  'Optimized_D11 - Cores:2, RAM:14 GB, Disk:100 GB'},
			{ 'id' : 'Optimized_D12', 'label':  'Optimized_D12 - Cores:4, RAM:28 GB, Disk:200 GB'},
			{ 'id' : 'Optimized_D13', 'label':  'Optimized_D13 - Cores:8, RAM:56 GB, Disk:400 GB'},
			{ 'id' : 'Optimized_D14', 'label':  'Optimized_D14 - Cores:16, RAM:112 GB, Disk:800 GB'},
			{ 'id' : 'Optimized_D1 v2', 'label':  'Optimized_D1 v2 - Cores:1, RAM:3.5 GB, Disk:50 GB'},
			{ 'id' : 'Optimized_D2 v2', 'label':  'Optimized_D2 v2 - Cores:2, RAM:7 GB, Disk:100 GB'},
			{ 'id' : 'Optimized_D3 v2', 'label':  'Optimized_D3 v2 - Cores:4, RAM:14 GB, Disk:200 GB'},
			{ 'id' : 'Optimized_D4 v2', 'label':  'Optimized_D4 v2 - Cores:8, RAM:28 GB, Disk:400 GB'},
			{ 'id' : 'Optimized_D5 v2', 'label':  'Optimized_D5 v2 - Cores:16, RAM:56 GB, Disk:800 GB'},
			{ 'id' : 'Optimized_D11 v2', 'label':  'Optimized_D11 v2 - Cores:2, RAM:14 GB, Disk:100 GB'},
			{ 'id' : 'Optimized_D12 v2', 'label':  'Optimized_D12 v2 - Cores:4, RAM:28 GB, Disk:200 GB'},
			{ 'id' : 'Optimized_D13 v2', 'label':  'Optimized_D13 v2 - Cores:8, RAM:56 GB, Disk:400 GB'},
			{ 'id' : 'Optimized_D14 v2', 'label':  'Optimized_D14 v2 - Cores:16, RAM:112 GB, Disk:800 GB'},
			{ 'id' : 'Optimized_G1', 'label':  'Optimized_G1 - Cores:2, RAM:28 GB, Disk:384 GB'},
			{ 'id' : 'Optimized_G2', 'label':  'Optimized_G2 - Cores:4, RAM:56 GB, Disk:768 GB'},
			{ 'id' : 'Optimized_G3', 'label':  'Optimized_G3 - Cores:8, RAM:112 GB, Disk:1,536 GB'},
			{ 'id' : 'Optimized_G4', 'label':  'Optimized_G4 - Cores:16, RAM:224 GB, Disk:3,072 GB'},
			{ 'id' : 'Optimized_G5', 'label':  'Optimized_G5 - Cores:32, RAM:448 GB, Disk:6,144 GB'}
		];

    });
