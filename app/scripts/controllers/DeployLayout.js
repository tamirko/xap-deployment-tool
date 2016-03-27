'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:DeployLayoutCtrl
 * @description
 * # DeployLayoutCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('DeployLayoutCtrl', function ($scope, $location, $stateParams, CloudProvidersService, $log, $modal, StepsService, DeploymentToolClient ) {
        console.log('provider', $stateParams.provider);

        if ( !$scope.data ) {
            $scope.data = {};
        }

        var provider = $stateParams.provider;
        DeploymentToolClient.readRequest( provider).then(function(result){
            $scope.data = _.merge({},$scope.data,result);
        });

        $scope.$watch('data', function( newValue ){
            DeploymentToolClient.updateRequest( provider, newValue );
        });

        $scope.currentProvider = CloudProvidersService.getById($stateParams.provider);

        $scope.deploySteps = $stateParams.deploySteps;

        $scope.goToStep = StepsService.goToStep;

        $scope.submitIsDisabled = false;

		$scope.isSubmitDisabled = function(){
			return $scope.submitIsDisabled;
		};

        $scope.submit = function(){
			$scope.submitIsDisabled = true;
            $scope.showOutputPanel = true;
            // result should have data.outputId
            DeploymentToolClient.submit( $stateParams.provider ).then(function success( result ){
                    $log.info('result is', result);
                    $scope.submitOutputId = result.data.outputId;
                    toastr.success('Successfully launched the execution');
                }, function error( result ){
                    $log.info('result is', result);
                    toastr.error('execution error');
                });
        };

        $scope.openUndeployDialog = function(){
           $modal.open({
               templateUrl: 'undeployDialog',
               controller: 'UndeployDialogCtrl'
           });
        };

        $scope.closeOutputPanel = function(){
            $scope.showOutputPanel = false;
			$scope.submitIsDisabled = false;
        };



        $scope.$watch('currentProvider', function( newValue, oldValue ){
            $log.debug('currentProvider changed', newValue );
            try {
                // IMPORTANT: don't take this down.. used for logos display!!!!
                // decided to do so since we need this in base layout, and the data is not available there
                // used scope inheritance to make the two scopes talk..
				$log.debug('newValue id is ', newValue.id );
                $scope.setProvider(newValue.id);
            }catch(e){}

            if ( !!newValue && !!oldValue && newValue !== oldValue ) {
                $log.info('current provider (newValue) is', newValue );
				$log.info('scope current provider    is ', $scope.currentProvider );
                $log.info('scope current provider ID is ', $scope.currentProvider.id );
                $location.path('/deploy/' + $scope.currentProvider.id + '/general-data');
            }
			else {
				$log.info('Where am I ?');
			}
        }, true);




    });
