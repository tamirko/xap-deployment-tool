'use strict';

/**
 * @ngdoc directive
 * @name demoApp.directive:chooseProvider
 * @description
 * # chooseProvider
 */
angular.module('demoApp')
  .directive('chooseProvider', function ( DeploymentToolService ) {
    return {
      templateUrl: 'views/directives/choose_provider.html',
      restrict: 'A',
        scope:{
            'currentProvider' : '=chooseProvider'
        },
      link: function postLink(scope) {
          scope.cloudProviders = DeploymentToolService.cloudProviders.items;
      }
    };
  });
