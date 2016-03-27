'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('MainCtrl', function ($scope, $http, $timeout, $sce) {
        $scope.form = {};

        function getOutput(){
            $http.get('/backend/' + $scope.outputId + '/output').then(
                function success( result ){
                    $scope.output = result.data;
                    $timeout(getOutput,3000);
                },
                function failure(){
                    $timeout(getOutput,3000);
                }
            );
        }

        $scope.managerUrl = $sce.trustAsResourceUrl('http://' + $scope.config.manager.ip + '/#/deployments');

		$scope.$watch('form.cfymngrip', function(newValue/*, oldValue*/){
			$scope.form.mngrValueChanged=true;
			if ( newValue!==undefined && newValue!=='' ){
				$scope.form.sshkeyitemid = '';
			}
			else {
				$scope.form.showCfyMgnr=false;
			}
		});

		$scope.managerBlur  = function() {
			if ( $scope.form.mngrValueChanged ) {
				if ( $scope.form.cfymngrip===undefined || $scope.form.cfymngrip==='') {
					$scope.form.showCfyMgnr=false;
				}
				else {
					$scope.form.showCfyMgnr=true;
					var mngrElement = document.getElementById('cfymgnrelem');
					mngrElement.src = 'http://'+$scope.form.cfymngrip+'/#/deployments';
				}
			}
		};

		$scope.$watch('form.appsource', function(newValue/*, oldValue*/){
			if ( newValue==='This catalog' ){
				$scope.form.appurl = '';
				$scope.form.otherappname = '';
			}
			/*else {
				$scope.selectedappname.title = '';
			} */
		});



		/*
		$scope.$watch('selectedappname.title', function(newValue, oldValue){
			//alert('searchStr2 '+$scope.form.searchStr);
			alert('TTL '+newValue);
		});

		$scope.$watch('selectedappname', function(newValue, oldValue){
			alert('selectedappname '+newValue);
		});	 */

        $scope.submit  = function() {
			if ( $scope.form.otherappname!==undefined && $scope.form.otherappname!=='' ) {
				$scope.form.appname = $scope.form.otherappname;
			}
			else {
				$scope.form.appname = $scope.selectedappname.title;
			}
            $http.post('/backend/submit', $scope.form).then(function ( result ) {
                toastr.success('Submitted successfully');
                $scope.outputId = result.data.outputId;
                $timeout(getOutput,3000);
            }, function ( result ) {
                toastr.error(result.data.message, 'error');
            });
        };

		$scope.appnames = [
				{ 'id': 'drupalAndMemcached', 'label': 'drupalAndMemcached'},
				{ 'id': 'nodecellar', 'label': 'nodecellar'},
				{ 'id': 'bulk', 'label': 'bulk'},
				{ 'id': 'activemq', 'label': 'activemq'},
				{ 'id': 'apache', 'label': 'apache'},
				{ 'id': 'cassandra', 'label': 'cassandra'},
				{ 'id': 'chef-activemq', 'label': 'chef-activemq'},
				{ 'id': 'chef-apache', 'label': 'chef-apache'},
				{ 'id': 'chef-cassandra', 'label': 'chef-cassandra'},
				{ 'id': 'chef-couchbase', 'label': 'chef-couchbase'},
				{ 'id': 'chef-couchdb', 'label': 'chef-couchdb'},
				{ 'id': 'chef-drupal', 'label': 'chef-drupal'},
				{ 'id': 'chef-elasticsearch', 'label': 'chef-elasticsearch'},
				{ 'id': 'chef-haproxy', 'label': 'chef-haproxy'},
				{ 'id': 'chef-jboss', 'label': 'chef-jboss'},
				{ 'id': 'chef-jenkins', 'label': 'chef-jenkins'},
				{ 'id': 'chef-jetty', 'label': 'chef-jetty'},
				{ 'id': 'chef-maven', 'label': 'chef-maven'},
				{ 'id': 'chef-memcached', 'label': 'chef-memcached'},
				{ 'id': 'chef-mongodb', 'label': 'chef-mongodb'},
				{ 'id': 'chef-mysql', 'label': 'chef-mysql'},
				{ 'id': 'chef-nginx', 'label': 'chef-nginx'},
				{ 'id': 'chef-nodejs', 'label': 'chef-nodejs'},
				{ 'id': 'chef-oc-redis', 'label': 'chef-oc-redis'},
				{ 'id': 'chef-play', 'label': 'chef-play'},
				{ 'id': 'chef-postgresql', 'label': 'chef-postgresql'},
				{ 'id': 'chef-rabbitmq', 'label': 'chef-rabbitmq'},
				{ 'id': 'chef-server', 'label': 'chef-server'},
				{ 'id': 'chef-solr', 'label': 'chef-solr'},
				{ 'id': 'chef-storm', 'label': 'chef-storm'},
				{ 'id': 'chef-subversion', 'label': 'chef-subversion'},
				{ 'id': 'chef-tomcat', 'label': 'chef-tomcat'},
				{ 'id': 'chef-zookeeper', 'label': 'chef-zookeeper'},
				{ 'id': 'couchbase', 'label': 'couchbase'},
				{ 'id': 'couchdb', 'label': 'couchdb'},
				{ 'id': 'elasticsearch', 'label': 'elasticsearch'},
				{ 'id': 'haproxy', 'label': 'haproxy'},
				{ 'id': 'jboss', 'label': 'jboss'},
				{ 'id': 'jenkins', 'label': 'jenkins'},
				{ 'id': 'jetty', 'label': 'jetty'},
				{ 'id': 'maven', 'label': 'maven'},
				{ 'id': 'memcached', 'label': 'memcached'},
				{ 'id': 'mongodb', 'label': 'mongodb'},
				{ 'id': 'mysql', 'label': 'mysql'},
				{ 'id': 'nginx', 'label': 'nginx'},
				{ 'id': 'nodejs', 'label': 'nodejs'},
				{ 'id': 'oc-redis', 'label': 'oc-redis'},
				{ 'id': 'play', 'label': 'play'},
				{ 'id': 'postgresql', 'label': 'postgresql'},
				{ 'id': 'rabbitmq', 'label': 'rabbitmq'},
				{ 'id': 'solr', 'label': 'solr'},
				{ 'id': 'storm', 'label': 'storm'},
				{ 'id': 'subversion', 'label': 'subversion'},
				{ 'id': 'tomcat', 'label': 'tomcat'},
				{ 'id': 'zookeeper', 'label': 'zookeeper'}
	    ];

		$scope.appsources = [
		       { 'id': 'This catalog','label': 'This catalog'},
			   { 'id': 'GitHub repository','label': 'GitHub repository'},
			   { 'id': 'Zip file url','label': 'Zip file url'}
	    ];

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

		$scope.oss = [
		       {
				  'id': '4668',
                  'label': 'Ubuntu Linux 14.04 LTS Trusty Tahr - Minimal Install (64 bit)'
			   }
		];

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
