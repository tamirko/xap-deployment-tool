'use strict';

/**
 * @ngdoc directive
 * @name demoApp.directive:cloudifyLoginDetails
 * @description
 * # cloudifyLoginDetails
 */
angular.module('demoApp')
    .directive('cloudLoginDetails', function () {
        return {
            templateUrl: 'views/directives/cloud_login_details.html',
            restrict: 'A',
            link: function postLink(/*scope, element, attrs*/) {
            }
        };
    });
