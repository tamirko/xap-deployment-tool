'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:DatacentredNodeTemplateCtrl
 * @description
 * # DatacentredNodeTemplateCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('DatacentredNodeTemplateCtrl', function ($scope) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

        if ( !$scope.nodeTemplates ) {
            $scope.nodeTemplates = [{}];
        }

        if ( !$scope.data.actualNodeTemplates ) {
            $scope.data.actualNodeTemplates = [{}];
        }
        else {
            $scope.nodeTemplates = $scope.data.actualNodeTemplates;
        }

        $scope.$watch('nodeTemplates', function( newValue ){
            $scope.data.actualNodeTemplates = $scope.nodeTemplates;
        });

        $scope.$watch('nodeTemplate1', function( newValue ){
            $scope.data.actualNodeTemplates[0] = newValue;
        });

        $scope.$watch('nodeTemplate2', function( newValue ){
            $scope.data.actualNodeTemplates[1] = newValue;
        });


        $scope.currentDate = new Date();
        $scope.currentMonth = (($scope.currentDate.getMonth()+1<10)?"0":"") +($scope.currentDate.getMonth()+1);
        $scope.currDay = (($scope.currentDate.getDate()<10)?"0":"")+$scope.currentDate.getDate();
        $scope.formattedDate = $scope.currDay + $scope.currentMonth;
        $scope.currentVersion = "_"+$scope.formattedDate + "_" + $scope.currentDate.getTime() + '_' +(Math.floor(Math.random() * 900) + 100);

        $scope.data.applicationName = "xap";
        $scope.data.cfyversion = "3.3.1GA";
        $scope.data.uploadBlueprint=true;
        $scope.data.deployApplication=false;
        $scope.data.applicationSources=2;
        $scope.data.blueprintFileName="blueprint.yaml";
        $scope.data.blueprintName=$scope.currentVersion;
        $scope.data.githuburl="https://github.com/tamirko/cloudify-deployment-tool-apps.git";
        $scope.data.tagBranchTypes=3;
        $scope.data.usingExistingManager=true;
        $scope.data.existingMngrIPaddress="192.168.0.5";



        $scope.isComputeNode = function(nodeTemplateIndex){
            // Remove this later
            if ( true ) {
                return true;
            }
            if ( !$scope.nodeTemplates[nodeTemplateIndex] ) {
                $scope.nodeTemplates[nodeTemplateIndex] = {};
                $scope.nodeTemplates[nodeTemplateIndex].isComputeNode = true;
                return true;
            }
            if ( !('isComputeNode'in $scope.nodeTemplates[nodeTemplateIndex]) ) {
                $scope.nodeTemplates[nodeTemplateIndex].isComputeNode = true;
                return true;
            }

            if ( $scope.nodeTemplates[nodeTemplateIndex].isComputeNode == undefined ) {
                $scope.nodeTemplates[nodeTemplateIndex].isComputeNode = true;
                return true;
            }

            return $scope.nodeTemplates[nodeTemplateIndex].isComputeNode;

        };

        $scope.toggleIsComputeNode = function(nodeTemplateIndex) {
            if ( !$scope.nodeTemplates[nodeTemplateIndex] ) {
                $scope.nodeTemplates[nodeTemplateIndex] = {};
                $scope.nodeTemplates[nodeTemplateIndex].isComputeNode = false;
                return;
            }

            $scope.nodeTemplates[nodeTemplateIndex].isComputeNode = !$scope.nodeTemplates[nodeTemplateIndex].isComputeNode;

        };

        $scope.$watch('uploadBlueprint', function( newValue ){
            $scope.data.uploadBlueprint = $scope.uploadBlueprint;
        });

        $scope.$watch('deployApplication', function( newValue ){
            $scope.data.deployApplication = newValue;
        });

        $scope.isApplicationEmpty = function(){
            if ( $scope.data.applicationName == undefined || $scope.data.applicationName == "" || $scope.data.applicationName == "*") {
                return true;
            }
            return false;
        };

        $scope.deployApplication =  !$scope.isApplicationEmpty();

        if ( $scope.data.uploadBlueprint == undefined ) {
            $scope.uploadBlueprint = true;
        }
        else {
            $scope.uploadBlueprint = $scope.data.uploadBlueprint;
        }

        $scope.toggleUploadBlueprint = function(){
            $scope.uploadBlueprint = !$scope.uploadBlueprint;
            if ( !$scope.deployApplication ) {
                $scope.deployApplication = true;
            }
        };

        $scope.need2UploadBlueprint = function(){
            return $scope.uploadBlueprint;
        };


        $scope.toggleDeployApplication = function(){
            $scope.deployApplication = !$scope.deployApplication;
            if ( !$scope.uploadBlueprint ) {
                $scope.uploadBlueprint = true;
            }
        };

        $scope.uploadBlueprintsOnly = function() {
            if ( $scope.data.applicationName == undefined ) {
                return true;
            }
            if ( $scope.data.applicationName == "*" ) {
                return true;
            }
            if ( $scope.data.applicationName == "" ) {
                return true;
            }
            return false;
        };

        $scope.need2DeployApplication = function(){
            return $scope.deployApplication;
        };


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

        $scope.forNodeUseExistingSecurityGroup = false;
        $scope.data.forNodeUseExistingSecurityGroup = false;
        $scope.toggleNodeExistingSecurityGroup = function(){
            $scope.forNodeUseExistingSecurityGroup = !$scope.forNodeUseExistingSecurityGroup;
            $scope.data.forNodeUseExistingSecurityGroup = $scope.forNodeUseExistingSecurityGroup;
        };

        $scope.existingNodeSecurityGroupIsEnabled = function(){
            return $scope.forNodeUseExistingSecurityGroup;
        };

        $scope.datacentredoss =  [
            { 'id': '621f75b6-8d28-47cf-9607-ae73943503b1', 'label': 'CentOS 6.6 dccloud' },
            { 'id': '74ff4015-aee1-4e02-aaa8-1c77b2650394', 'label': 'CentOS 7.0' },
            { 'id': '1ca753e4-beee-4fbb-a341-ef36cf31c27c', 'label': 'CirrOS 0.3.3' },
            { 'id': '676965bc-e973-4b8b-a77d-eba6daa9225c', 'label': 'CirrOS 0.3.4' },
            { 'id': '1fe2dc6e-3c64-43c0-989b-95cd4e073795', 'label': 'CoreOS' },
            { 'id': '8d4ec154-1f8f-4a0b-8f21-3df92bb72524', 'label': 'Debian \'jessie\' 8.1 x86_64' },
            { 'id': '6de4cfa2-a278-44bf-a7b5-6a9522690051', 'label': 'Debian \'wheezy\' 7 dccloud' },
            { 'id': '742e0414-c985-4994-b307-4aafade942b3', 'label': 'Fedora 20' },
            { 'id': '7c0c6d85-072f-47d3-8036-44ef5a2f661f', 'label': 'Fedora 21' },
            { 'id': '41f48c21-4ca9-4477-83b9-82f37070002c', 'label': 'Fedora 22' },
            { 'id': '9d5d75a4-9787-4eab-ba58-844ebc8ff4a5', 'label': 'FreeBSD 10.1 bsd-cloudinit' },
            { 'id': '6c3047c6-17b1-4aaf-a657-9229bb481e50', 'label': 'Ubuntu 14.04' },
            { 'id': '5374b489-1c8a-4056-bb1e-0d6a9eaf9870', 'label': 'Ubuntu Linux 14.10 Initrd 3.16.0-37 arm64' },
            { 'id': '3d20595e-8261-4a9f-9701-9d37cb702a16', 'label': 'Ubuntu Linux 14.10 Kernel Image 3.16.0-37 arm64' },
            { 'id': 'ad40aeec-d548-4196-af81-63b9b619f8f0', 'label': 'Ubuntu Linux 14.10 arm64' },
            { 'id': 'd05fc0b7-77c7-4b4c-bf98-3651a8ad4b95', 'label': 'Ubuntu Linux 15.04' },
            { 'id': '92419b6a-772e-4f6f-ae07-4ba8e7553486', 'label': 'Ubuntu Linux 15.04 Initrd 3.19.0-15 arm64' },
            { 'id': '7b098a59-8fb3-47e9-9746-cc0de92bddd2', 'label': 'Ubuntu Linux 15.04 Kernel 3.19.0-15 arm64' },
            { 'id': '7ee4e47a-5080-4328-8e75-1c1a2cd85bac', 'label': 'Ubuntu Linux 15.04 arm64' },
            { 'id': '3cfe171d-e64d-45a6-9c64-bac42dc7eef5', 'label': 'Ubuntu Linux 15.10' },
            { 'id': '9f319675-ad01-4aa6-bc33-032f86a460b0', 'label': 'Ubuntu Linux 15.10 Initrd 4.2.0-16 arm64' },
            { 'id': '1ee0ea53-ff10-409b-8f33-0d779f96ff5d', 'label': 'Ubuntu Linux 15.10 Kernel 4.2.0-16 arm64' },
            { 'id': '12fbfed3-934c-4f1b-b084-d92bb57c2380', 'label': 'Ubuntu Linux 15.10 arm64' },
            { 'id': '07a93cc5-b3f1-499b-a7f2-ab420526ae1f', 'label': 'Windows Server 2012 R2 Standard' },
            { 'id': 'bbc1065e-babd-4962-b380-625143f43729', 'label': 'Windows Server 2012 R2 Standard Eval' },
            { 'id': '5f10d1a7-5393-4a77-bd6f-b326dd5a564b', 'label': 'openSuSE 13.2' }
        ];

        $scope.datacentredflavors =  [
            { 'id': '05a9e6d1-d29f-4e98-9eab-51c9a6beed44', 'label': 'RAM: 2048 MB, 20 GB, 1 VCPUs'},
            { 'id': '196235bc-7ca5-4085-ac81-7e0242bda3f9', 'label': 'RAM: 4096 MB, 40 GB, 2 VCPUs'},
            { 'id': '5e68b95a-61fe-464f-913d-df044c7e433d', 'label': 'RAM: 16384 MB, 80 GB, 4 VCPUs'},
            { 'id': '718f2a6d-52c5-4f23-a774-49df51c6eedc', 'label': 'RAM: 1024 MB, 80 GB, 1 VCPUs'},
            { 'id': '78d43ae0-7c98-48d2-9adc-90e8f8f6fe99', 'label': 'RAM: 512 MB, 10 GB, 1 VCPUs'},
            { 'id': '8e6069a3-d8c6-4741-8e0d-6373b2ca38cc', 'label': 'RAM: 1024 MB, 20 GB, 1 VCPUs'},
            { 'id': '8f4b7ae1-b8c2-431f-bb0c-362a5ece0381', 'label': 'RAM: 4096 MB, 80 GB, 2 VCPUs'},
            { 'id': '9cf6e43b-e191-47ca-8665-f8592e2d6227', 'label': 'RAM: 8192 MB, 80 GB, 4 VCPUs'},
            { 'id': 'af2a80fe-ccad-43df-8cae-6418da948467', 'label': 'RAM: 16384 MB, 80 GB, 8 VCPUs'},
            { 'id': 'b122c607-2b5b-43fd-8879-cf6cb742e102', 'label': 'RAM: 2048 MB, 80 GB, 1 VCPUs'},
            { 'id': 'b671216b-1c68-4765-b752-0e8e6b6d015f', 'label': 'RAM: 2048 MB, 40 GB, 1 VCPUs'},
            { 'id': 'b8e8ab6a-5480-478c-b1de-b09050683d7d', 'label': 'RAM: 32000 MB, 80 GB, 8 VCPUs'},
            { 'id': 'bf6dbcab-f0a5-49d7-b427-0ee09cc5f583', 'label': 'RAM: 2048 MB, 80 GB, 2 VCPUs'},
            { 'id': 'c4b193d2-f331-4250-9b15-bbfde97c462a', 'label': 'RAM: 2048 MB, 40 GB, 2 VCPUs'},
            { 'id': 'c871d2fc-c6df-41ab-8a89-6ddc5d8137d0', 'label': 'RAM: 32000 MB, 80 GB, 16 VCPUs'},
            { 'id': 'd87de0ca-9c0e-4759-a704-8621883c3415', 'label': 'RAM: 8192 MB, 40 GB, 2 VCPUs'},
            { 'id': 'dcd2be06-0940-4410-9d1f-cbdc22a847e7', 'label': 'RAM: 8192 MB, 80 GB, 2 VCPUs'},
            { 'id': 'f0577618-9125-4948-b450-474e225bbc4c', 'label': 'RAM: 1024 MB, 40 GB, 1 VCPUs'}
        ];

        $scope.numberOfContainers =  [
            { 'id': '2', 'label': '2'}
        ];

        $scope.gscsPerVM =  [
            { 'id': '1', 'label': '1'}
        ];

        $scope.xapGscOptions =  [
            { 'id': '-Xms2g -Xmx2g -Xmn512m', 'label': '-Xms2g -Xmx2g -Xmn512m'}
        ];


    });
