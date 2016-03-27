'use strict';

/**
 * @ngdoc service
 * @name demoApp.DeploymentToolClient
 * @description
 * # DeploymentToolClient
 * Service in the demoApp.
 */
angular.module('demoApp')
    .service('DeploymentToolClient', function ( DeployRequestModel , $http ) {

        this.readRequest = function( provider ){
            return DeployRequestModel.get(provider);
        };


        this.updateRequest = function( provider, request ){
            return DeployRequestModel.update( provider, request );
        };

        this.getOutput = function(outputId){
            return $http({
                method: 'GET',
                url: '/backend/' + outputId + '/output'
            });
        };

        //this.deleteRequest = function( provider ){
        //    return DeployRequestModel.delete(provider);
        //};

        this.undeploy = function( inputs ){
            console.log('DeploymentToolClient undeploy killExistingManager is : ' + inputs.killExistingManager);
            console.log('DeploymentToolClient undeploy deleteDeployments is   : ' + inputs.deleteDeployments);
            console.log('DeploymentToolClient undeploy deleteBlueprints is    : ' + inputs.deleteBlueprints);
            console.log('DeploymentToolClient undeploy existingMngrIPaddress is    : ' + inputs.existingMngrIPaddress);
            return $http(
                {
                    method: 'POST',
                    data: inputs,
                    url: '/backend/undeploy'
                }
            );
        };

        this.submit = function( provider ){
            console.log('DeploymentToolClient provider is: ' + provider);
            return this.readRequest(provider).then(function(result){
                var currResult = _.merge({},{'provider' : provider},result);
                console.log('DeploymentToolClient provider after merge is: ' + currResult.provider);
                return $http(
                    {
                        method: 'POST',
                        data: currResult,
                        url: '/backend/submit'// todo: fill in correct url
                    }
                );
            });

        };
    });


