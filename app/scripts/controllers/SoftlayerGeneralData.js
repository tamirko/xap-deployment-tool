'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:GeneralDataCtrl
 * @description
 * # GeneralDataCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('SoftlayerGeneralDataCtrl', function ($scope) {

        $scope.name = 'Softlayer Cloud Provider';

        if ( !$scope.data ) {
            $scope.data = {};
        }


        $scope.applicationSources = [
            {'id': '1', 'label': 'This catalog', key : 'thiscatalog'},
            {'id': '2', 'label': 'GitHub repository' , key : 'github'},
            {'id': '3', 'label': 'Remote zip file', key: 'zipfile' }
        ];

        $scope.data.applicationSources = $scope.applicationSources[0];


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
            { 'id': '3.4.0GA',  'label': '3.4.0 GA'}

        ];

        $scope.catalogapplications = [
            'drupalAndMemcached',
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

        $scope.selectApplicationName = function( item ){
            $scope.data.applicationName = item;
        };

        $scope.getApplicationNameSuggestion = function() {
            if ($scope.usingThisCatalog() ) {
                return $scope.catalogapplications;
            }
            else{
                return null;
            }
        };

        $scope.currentApplicationIndex = 1;

        $scope.usingGitHubRepo = function(){
            return $scope.currentApplicationIndex == 2;
        };

        $scope.usingThisCatalog = function(){
            return $scope.currentApplicationIndex == 1;
        };


        $scope.setApplicationSource = function(currentAppIndex){
            $scope.currentApplicationIndex = currentAppIndex;
        };


		$scope.datacenters = [
			{ 'id': '265592','label': 'Amsterdam 1'},
			{ 'id': '814994','label': 'Amsterdam 3'},
			{ 'id': '2','label': 'Corporate HQ Lab'},
			{ 'id': '3','label': 'Dallas 1'},
			{ 'id': '138124','label': 'Dallas 5'},
			{ 'id': '154820','label': 'Dallas 6'},
			{ 'id': '449494','label': 'Dallas 9'},
			{ 'id': '449506','label': 'Frankfurt 2'},
			{ 'id': '352494','label': 'Hong Kong 2'},
			{ 'id': '142775','label': 'Houston 2'},
			{ 'id': '358694','label': 'London 2'},
			{ 'id': '449596','label': 'Melbourne 1'},
			{ 'id': '449600','label': 'Mexico 1'},
			{ 'id': '815394','label': 'Milan 1'},
			{ 'id': '449610','label': 'Montreal 1'},
			{ 'id': '449500','label': 'Paris 1'},
			{ 'id': '168642','label': 'San Jose 1'},
			{ 'id': '18171','label': 'Seattle'},
			{ 'id': '224092','label': 'Singapore 1'},
			{ 'id': '449612','label': 'Sydney 1'},
			{ 'id': '449604','label': 'Tokyo 2'},
			{ 'id': '448994','label': 'Toronto 1'},
			{ 'id': '37473','label': 'Washington 1'}
		];
    });
