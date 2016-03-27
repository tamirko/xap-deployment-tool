'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:AmazonGeneralDataCtrl
 * @description
 * # AmazonGeneralDataCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('AmazonGeneralDataCtrl', function ($scope ) {

		$scope.name = 'Amazon Cloud Provider';

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

		$scope.awsregions = [
			{ 'id': 'us-east-1', 'label': 'US East (N. Virginia)' },
			{ 'id': 'us-west-1', 'label': 'US West (N. California)' },
			{ 'id': 'us-west-2', 'label': 'US West (Oregon)' },
			{ 'id': 'eu-west-1', 'label': 'EU (Ireland)' },
			{ 'id': 'eu-central-1', 'label': 'EU (Frankfurt)' },
			{ 'id': 'ap-southeast-1', 'label': 'Asia Pacific (Singapore)' },
			{ 'id': 'ap-northeast-1', 'label': 'Asia Pacific (Tokyo)' },
			{ 'id': 'ap-southeast-2', 'label': 'Asia Pacific (Sydney)' },
			{ 'id': 'sa-east-1', 'label': 'South America (Sao Paulo)' }
		];

  });
