'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:AzureNodeTemplateCtrl
 * @description
 * # AzureNodeTemplateCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('AzureNodeTemplateCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

        if ( !$scope.nodeTemplates ) {
            $scope.nodeTemplates = [{}];
        }

        if ( !$scope.data.actualNodeTemplates ) {
            $scope.data.actualNodeTemplates = [{}];
        }

        $scope.$watch('nodeTemplates', function( newValue ){
            $scope.data.actualNodeTemplates = $scope.nodeTemplates;
        });

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

        $scope.forNodeUseExistingResourceGroup = false;
        $scope.toggleNodeExistingResourceGroup = function(){
            $scope.forNodeUseExistingResourceGroup = !$scope.forNodeUseExistingResourceGroup;
            $scope.data.forNodeUseExistingResourceGroup = $scope.forNodeUseExistingResourceGroup;
        };

        $scope.existingNodeResourceGroupIsEnabled = function(){
            return $scope.forNodeUseExistingResourceGroup;
        };

        $scope.forNodeUseExistingStorageAccount = false;
        $scope.toggleNodeExistingStorageAccount = function(){
            $scope.forNodeUseExistingStorageAccount = !$scope.forNodeUseExistingStorageAccount;
            $scope.data.forNodeUseExistingStorageAccount = $scope.forNodeUseExistingStorageAccount;
        };

        $scope.existingNodeStorageAccountIsEnabled = function(){
            return $scope.forNodeUseExistingStorageAccount;
        };

        $scope.forNodeUseExistingVnet = false;
        $scope.toggleNodeExistingVnet = function(){
            $scope.forNodeUseExistingVnet = !$scope.forNodeUseExistingVnet;
            $scope.data.forNodeUseExistingVnet = $scope.forNodeUseExistingVnet;
        };

        $scope.existingNodeVnetIsEnabled = function(){
            return $scope.forNodeUseExistingVnet;
        };

        $scope.forNodeUseExistingSubnet = false;
        $scope.toggleNodeExistingSubnet = function(){
            $scope.forNodeUseExistingSubnet = !$scope.forNodeUseExistingSubnet;
            $scope.data.forNodeUseExistingSubnet = $scope.forNodeUseExistingSubnet;
        };

        $scope.existingNodeSubnetIsEnabled = function(){
            return $scope.forNodeUseExistingSubnet;
        };

        $scope.forNodeUseExistingSecurityGroup = false;
        $scope.data.forNodeUseExistingSecurityGroup = false;
        $scope.toggleNodeExistingSecurityGroup = function(){
            $scope.forNodeUseExistingSecurityGroup = !$scope.forNodeUseExistingSecurityGroup;
            $scope.data.forNodeUseExistingSecurityGroup = $scope.forNodeUseExistingSecurityGroup;
        };

        $scope.existingNodeSecurityGroupIsEnabled = function(){
            return $scope.forNodeUseExistingSecurityGroup;
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
