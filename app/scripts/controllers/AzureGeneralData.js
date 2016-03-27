'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:AzureGeneralDataCtrl
 * @description
 * # AzureGeneralDataCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('AzureGeneralDataCtrl', function ($scope) {

        $scope.name = 'Azure Cloud Provider';

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
          { 'id': '3.4.0GA',  'label': '3.4.0 GA'},
          { 'id': '3.4.1M1',  'label': '3.4.1 M1'},
          { 'id': '3.4.1M2',  'label': '3.4.1 M2'}

        ];

        $scope.catalogapplications = [
          'nodecellarWithHealing',
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

      $scope.azurelocations = [
			{ 'id': 'centralus', 'label': 'Central US' },
			{ 'id': 'eastasia', 'label': 'East Asia' },
			{ 'id': 'eastus', 'label': 'East US' },
			{ 'id': 'eastus2', 'label': 'East US 2' },
			{ 'id': 'japaneast', 'label': 'Japan East' },
			{ 'id': 'japanwest', 'label': 'Japan West' },
			{ 'id': 'westeurope', 'label': 'North Europe' },
			{ 'id': 'southcentralus', 'label': 'South Central US' },
			{ 'id': 'southeastasia', 'label': 'Southeast Asia' },
			{ 'id': 'westeurope', 'label': 'West Europe' },
			{ 'id': 'westus', 'label': 'West US' }
      ];

  });
