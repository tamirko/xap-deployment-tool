'use strict';

/**
 * @ngdoc overview
 * @name demoApp
 * @description
 * # demoApp
 *
 * Main module of the application.
 */
angular
    .module('demoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'pascalprecht.translate',
        'ui.select',
        'ui.router',
        'pageslide-directive',
        'ct.ui.router.extras'
    ])
    .config(function ($routeProvider, uiSelectConfig, $stateProvider, $urlRouterProvider, $translateProvider ) {
        uiSelectConfig.theme = 'selectize';

        // add translate module
        $translateProvider.useStaticFilesLoader(
        {
            prefix: '/translations/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');

        toastr.options =  {
           'positionClass': 'toast-top-center'
        };

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        $urlRouterProvider.otherwise(function( $injector ){
            $injector.get('$state').go('deploy');
        });

        $stateProvider
            .state('deploy', {
                url: '/deploy',
                templateUrl: 'views/directives/base_layout.html',
                controller: function( $scope ){

                    $scope.setProvider = function( provider ){
                        $scope.provider = provider;
                    };
                },

                deepStateRedirect: { default: { state: 'deploy.provider' , params : { provider : 'azure' } } }
            })

            .state('deploy.provider', {
                url: '/:provider',
                templateUrl: 'views/directives/deploy_layout.html',
                controller: 'DeployLayoutCtrl',
                params: {
                    deploySteps : [
                     //   { 'id' : 'generalData'  , 'slug' : 'general-data'         , 'label': 'General Data'},
                     //   { 'id' : 'managerConfig', 'slug' : 'manager-config'       , 'label': 'Manager Config'},
                        { 'id' : 'nodeTemplate' , 'slug' : 'node-template'        , 'label': 'Node Template'}
                     //   { 'id' : 'emailAddress' , 'slug' : 'email-address'        , 'label': 'Email Address'}
                    ]
                },
                deepStateRedirect: { default: { state: 'deploy.provider.page.step', params : { provider : 'azure', step:'general-data'}  } } })
            .state('deploy.provider.page', { // adds 'next','previous' button to all pages (other than last?)
                templateUrl: 'views/directives/deploy_page_layout.html',
                controller: 'DeployPageLayoutCtrl',
                abstract:true

            })
            .state('deploy.provider.page.step', {
                url: '/:step',
                controller: function($stateParams, $controller, $scope, DeploymentToolClient, $log ){
                    $log.debug('return controller');
                    var step = $stateParams.step;
                    var provider = $stateParams.provider;
                    step = step.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });



                    $controller(capitalizeFirstLetter(provider) + capitalizeFirstLetter(step)/**/ + 'Ctrl', { $scope: $scope });
                },
                templateUrl: function(stateParams){
                    return 'views/' + stateParams.provider + '/' + stateParams.step.replace(/-/g,'_') + '.html';
                }
            });



    }).run(function ($rootScope) {
        if (typeof(window.config) !== 'undefined') {
            $rootScope.config = window.config;
        }
    });
