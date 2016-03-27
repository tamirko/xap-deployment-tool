'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:AmazonManagerConfigCtrl
 * @description
 * # AmazonManagerConfigCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('AmazonManagerConfigCtrl', function ($scope) {

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

        $scope.instancetypes =  [ //cci
			{ 'id' : 't1.micro', 'label':  't1.micro - 1 vCPUs,0.613 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 't2.micro', 'label':  't2.micro - 1 vCPUs,1 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 't2.small', 'label':  't2.small - 1 vCPUs,2 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 't2.medium', 'label':  't2.medium - 2 vCPUs,4 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 't2.large', 'label':  't2.large - 2 vCPUs,8 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'm4.large', 'label':  'm4.large - 2 vCPUs,8 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'm4.xlarge', 'label':  'm4.xlarge - 4 vCPUs,16 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'm4.2xlarge', 'label':  'm4.2xlarge - 8 vCPUs,32 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'm4.4xlarge', 'label':  'm4.4xlarge - 16 vCPUs,64 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'm4.10xlarge', 'label':  'm4.10xlarge - 40 vCPUs,160 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'm3.medium', 'label':  'm3.medium - 1 vCPUs,3.75 GB of RAM , Disk (GB): 1 x 4 (SSD)'} ,
			{ 'id' : 'm3.large', 'label':  'm3.large - 2 vCPUs,7.5 GB of RAM , Disk (GB): 1 x 32 (SSD)'} ,
			{ 'id' : 'm3.xlarge', 'label':  'm3.xlarge - 4 vCPUs,15 GB of RAM , Disk (GB): 2 x 40 (SSD)'} ,
			{ 'id' : 'm3.2xlarge', 'label':  'm3.2xlarge - 8 vCPUs,30 GB of RAM , Disk (GB): 2 x 80 (SSD)'} ,
			{ 'id' : 'm1.small', 'label':  'm1.small - 1 vCPUs,1.7 GB of RAM , Disk (GB): 1 x 160'} ,
			{ 'id' : 'm1.medium', 'label':  'm1.medium - 1 vCPUs,3.7 GB of RAM , Disk (GB): 1 x 410'} ,
			{ 'id' : 'm1.large', 'label':  'm1.large - 2 vCPUs,7.5 GB of RAM , Disk (GB): 2 x 420'} ,
			{ 'id' : 'm1.xlarge', 'label':  'm1.xlarge - 4 vCPUs,15 GB of RAM , Disk (GB): 4 x 420'} ,
			{ 'id' : 'c4.large', 'label':  'c4.large - 2 vCPUs,3.75 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'c4.xlarge', 'label':  'c4.xlarge - 4 vCPUs,7.5 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'c4.2xlarge', 'label':  'c4.2xlarge - 8 vCPUs,15 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'c4.4xlarge', 'label':  'c4.4xlarge - 16 vCPUs,30 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'c4.8xlarge', 'label':  'c4.8xlarge - 36 vCPUs,60 GB of RAM , Disk (GB): EBS only'} ,
			{ 'id' : 'c3.large', 'label':  'c3.large - 2 vCPUs,3.75 GB of RAM , Disk (GB): 2 x 16 (SSD)'} ,
			{ 'id' : 'c3.xlarge', 'label':  'c3.xlarge - 4 vCPUs,7.5 GB of RAM , Disk (GB): 2 x 40 (SSD)'} ,
			{ 'id' : 'c3.2xlarge', 'label':  'c3.2xlarge - 8 vCPUs,15 GB of RAM , Disk (GB): 2 x 80 (SSD)'} ,
			{ 'id' : 'c3.4xlarge', 'label':  'c3.4xlarge - 16 vCPUs,30 GB of RAM , Disk (GB): 2 x 160 (SSD)'} ,
			{ 'id' : 'c3.8xlarge', 'label':  'c3.8xlarge - 32 vCPUs,60 GB of RAM , Disk (GB): 2 x 320 (SSD)'} ,
			{ 'id' : 'c1.medium', 'label':  'c1.medium - 2 vCPUs,1.7 GB of RAM , Disk (GB): 1 x 350'} ,
			{ 'id' : 'c1.xlarge', 'label':  'c1.xlarge - 8 vCPUs,7 GB of RAM , Disk (GB): 4 x 420'} ,
			{ 'id' : 'cc2.8xlarge', 'label':  'cc2.8xlarge - 32 vCPUs,60.5 GB of RAM , Disk (GB): 4 x 840'} ,
			{ 'id' : 'g2.2xlarge', 'label':  'g2.2xlarge - 8 vCPUs,15 GB of RAM , Disk (GB): 1 x 60 (SSD)'} ,
			{ 'id' : 'g2.8xlarge', 'label':  'g2.8xlarge - 32 vCPUs,60 GB of RAM , Disk (GB): 2 x 120 (SSD)'} ,
			{ 'id' : 'r3.large', 'label':  'r3.large - 2 vCPUs,15 GB of RAM , Disk (GB): 1 x 32 (SSD)'} ,
			{ 'id' : 'r3.xlarge', 'label':  'r3.xlarge - 4 vCPUs,30.5 GB of RAM , Disk (GB): 1 x 80 (SSD)'} ,
			{ 'id' : 'r3.2xlarge', 'label':  'r3.2xlarge - 8 vCPUs,61 GB of RAM , Disk (GB): 1 x 160 (SSD)'} ,
			{ 'id' : 'r3.4xlarge', 'label':  'r3.4xlarge - 16 vCPUs,122 GB of RAM , Disk (GB): 1 x 320 (SSD)'} ,
			{ 'id' : 'r3.8xlarge', 'label':  'r3.8xlarge - 32 vCPUs,244 GB of RAM , Disk (GB): 2 x 320 (SSD)'} ,
			{ 'id' : 'm2.xlarge', 'label':  'm2.xlarge - 2 vCPUs,17.1 GB of RAM , Disk (GB): 1 x 420'} ,
			{ 'id' : 'm2.2xlarge', 'label':  'm2.2xlarge - 4 vCPUs,34.2 GB of RAM , Disk (GB): 1 x 850'} ,
			{ 'id' : 'm2.4xlarge', 'label':  'm2.4xlarge - 8 vCPUs,68.4 GB of RAM , Disk (GB): 2 x 840'} ,
			{ 'id' : 'cr1.8xlarge', 'label':  'cr1.8xlarge - 32 vCPUs,244 GB of RAM , Disk (GB): 2 x 120 (SSD)'} ,
			{ 'id' : 'd2.xlarge', 'label':  'd2.xlarge - 4 vCPUs,30.5 GB of RAM , Disk (GB): 3 x 2048'} ,
			{ 'id' : 'd2.2xlarge', 'label':  'd2.2xlarge - 8 vCPUs,61 GB of RAM , Disk (GB): 6 x 2048'} ,
			{ 'id' : 'd2.4xlarge', 'label':  'd2.4xlarge - 16 vCPUs,122 GB of RAM , Disk (GB): 12 x 2048'} ,
			{ 'id' : 'd2.8xlarge', 'label':  'd2.8xlarge - 36 vCPUs,244 GB of RAM , Disk (GB): 24 x 2048'} ,
			{ 'id' : 'i2.xlarge', 'label':  'i2.xlarge - 4 vCPUs,30.5 GB of RAM , Disk (GB): 1 x 800 (SSD)'} ,
			{ 'id' : 'i2.2xlarge', 'label':  'i2.2xlarge - 8 vCPUs,61 GB of RAM , Disk (GB): 2 x 800 (SSD)'} ,
			{ 'id' : 'i2.4xlarge', 'label':  'i2.4xlarge - 16 vCPUs,122 GB of RAM , Disk (GB): 4 x 800 (SSD)'} ,
			{ 'id' : 'i2.8xlarge', 'label':  'i2.8xlarge - 32 vCPUs,244 GB of RAM , Disk (GB): 8 x 800 (SSD)'}
		];
    });
