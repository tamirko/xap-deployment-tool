'use strict';

/**
 * @ngdoc service
 * @name demoApp.DeployRequestModel
 * @description
 * # DeployRequestModel
 * Service in the demoApp.
 */
angular.module('demoApp')
    .service('DeployRequestModel', function ( $q ) {

        var database = {};

        this.get = function( provider ){ // todo: find a way to simply proxy all requests
            var deferred = $q.defer();
            deferred.resolve(database[provider]);
            return deferred.promise;
        };


        this.update = function( provider, request ){
            var deferred = $q.defer();
            database[provider] = request;
            deferred.resolve( request );
            return deferred.promise;
        };


        this.delete = function( provider ){
            var deferred = $q.defer();
            delete database[provider];
            return deferred.promise;
        };
    });


// USE THIS DIRECTIVE TO DEBUG THE DB -- not in a separate file because it is just for debug, no need to test etc..
//
//angular.module('demoApp').directive('showModel', function(){
//    return {
//        restrict:'A',
//        template: '{{model}}',
//        controller: function( $scope, $stateParams, DeployRequestModel ){
//            Dep
//        }
//    }
//})
