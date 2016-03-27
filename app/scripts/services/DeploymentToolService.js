'use strict';

/**
 * @ngdoc service
 * @name demoApp.DeploymentToolService
 * @description
 * # DeploymentToolService
 * Service in the demoApp.
 */
angular.module('demoApp')
    .service('DeploymentToolService', function ( CloudProvidersService ) {
        this.cloudProviders = CloudProvidersService;
    });
