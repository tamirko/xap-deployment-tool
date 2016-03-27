'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:DatacentredGeneralDataCtrl
 * @description
 * # DatacentredGeneralDataCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('DatacentredGeneralDataCtrl', function ($scope) {

        $scope.name = 'DataCentred Cloud Provider';

        if ( !$scope.data ) {
            $scope.data = {};
        }


        $scope.applicationSources = [
            {'id': 1, 'label': 'This catalog', key : 'thiscatalog'},
            {'id': 2, 'label': 'GitHub repository' , key : 'github'},
            {'id': 3, 'label': 'Remote zip file', key: 'zipfile' }
        ];

        $scope.tagBranchTypes = [
            {'id': '1', 'label': 'GitHub Tag', key : 'GITHUBTAG'},
            {'id': '2', 'label': 'GitHub Branch' , key : 'GITHUBBRANCH'},
            {'id': '3', 'label': 'GitHub Master', key: 'githubmaster' }
        ];

        if ( $scope.data.applicationSources == undefined ) {
            $scope.data.applicationSources = $scope.applicationSources[0];
            $scope.currentApplicationIndex = 1;
        }
        else {
            $scope.currentApplicationIndex = $scope.data.applicationSources.id;
        }


        $scope.cfyversions = [
            { 'id': '3.3.1GA',  'label': '3.3.1 GA'},
            { 'id': '3.4.0M1',  'label': '3.4.0 M1'},
            { 'id': '3.4.0M2',  'label': '3.4.0 M2'},
            { 'id': '3.4.0M3',  'label': '3.4.0 M3'},
            { 'id': '3.4.0M4',  'label': '3.4.0 M4'},
            { 'id': '3.4.0M5',  'label': '3.4.0 M5'},
            { 'id': '3.4.0M6',  'label': '3.4.0 M6'},
            { 'id': '3.4.0M7',  'label': '3.4.0 M7'},
            { 'id': '3.4.0M8',  'label': '3.4.0 M8'},
            { 'id': '3.4.0RC1', 'label': '3.4.0 RC1'},
            { 'id': '3.4.0RC2', 'label': '3.4.0 RC2'},
            { 'id': '3.4.0GA',  'label': '3.4.0 GA'},
            { 'id': '3.4.1M1',  'label': '3.4.1 M1'},
            { 'id': '3.4.1M2',  'label': '3.4.1 M2'}

        ];

        $scope.catalogapplications = [
            'nodecellar',
            'apache',
            'cassandra',
            'elasticsearch',
            'haproxy',
            'jboss',
            'jenkins',
            'memcached',
            'mongodb',
            'mysql',
            'nginx',
            'postgresql',
            'rabbitmq',
            'tomcat',
            'zookeeper'
        ];


        $scope.$watch('deployApplication', function( newValue ){
            $scope.data.deployApplication = newValue;
        });

        $scope.selectApplicationName = function( item ){
            $scope.data.applicationName = item;
            if ( item == undefined || item == "" || item == "*" ) {
                $scope.data.deployApplication = false;
                $scope.deployApplication = false;
            }
            else {
                $scope.data.deployApplication = true;
                $scope.deployApplication = true;
            }
        };

        if ( $scope.data.deployApplication == undefined || $scope.data.deployApplication == "" || $scope.data.deployApplication == "*") {
            $scope.data.deployApplication = false;
            $scope.deployApplication = false;
        }
        else {
            $scope.deployApplication = $scope.data.deployApplication;
        }

        $scope.$watch('applicationName', function( newValue ){
            console.log('applicationName newValue '+ newValue);
            console.log('applicationName          '+ $scope.applicationName);
            if ( newValue == undefined || newValue.toString() == "*" || newValue.toString() == "") {
                $scope.data.deployApplication = false;
            }
            else {
                $scope.data.applicationName = newValue;
                $scope.data.deployApplication = true;
                $scope.deployApplication = true;
            }
        });

        $scope.getApplicationNameSuggestion = function() {
            if ($scope.usingThisCatalog() ) {
                return $scope.catalogapplications;
            }
            else{
                return null;
            }
        };



        $scope.usingGitHubRepo = function(){
            return $scope.currentApplicationIndex == 2;
        };

        $scope.usingThisCatalog = function(){
            return $scope.currentApplicationIndex == 1;
        };


        $scope.setApplicationSource = function(currentAppIndex){
            $scope.currentApplicationIndex = currentAppIndex;
        };

        $scope.availabilityZones = [
            { 'id': 'sal01', 'label': 'production' },
            { 'id': 'sal02', 'label': 'staging'},
            { 'id': 'sal03', 'label': 'testing' },
            { 'id': 'sal04', 'label': 'qa' }
        ];

    });
