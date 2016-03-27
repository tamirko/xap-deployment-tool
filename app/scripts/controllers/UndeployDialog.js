'use strict';

/**
 * @ngdoc function
 *
 * The template is at deploy_layout.html <script> tag
 *
 * @name demoApp.controller:UndeployDialogCtrl
 * @description
 * # UndeployDialogCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('UndeployDialogCtrl', function ($scope, $modalInstance, DeploymentToolClient ) {

        if ( !$scope.data ) {
            $scope.data = {};
        }

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };

        $scope.killExistingManager = true;
        $scope.toggleKillExistingManager = function(){
            $scope.killExistingManager = !$scope.killExistingManager;
        };
        $scope.need2KillExistingManager = function(){
            return $scope.killExistingManager;
        };

        $scope.deleteDeployments = true;
        $scope.toggleDeleteDeployments = function(){
            $scope.deleteDeployments = !$scope.deleteDeployments;
        };
        $scope.need2DeleteDeployments = function(){
            return $scope.deleteDeployments;
        };



        $scope.deleteBlueprints = true;
        $scope.toggleDeleteBlueprints = function(){
            $scope.deleteBlueprints = !$scope.deleteBlueprints;
            if ( $scope.deleteBlueprints ) {
                $scope.deleteDeployments = true;
            }
        };
        $scope.need2DeleteBlueprints = function(){
            return $scope.deleteBlueprints;
        };

        $scope.runUndeploy = function(){
            $scope.submitIsDisabled = true;
            $scope.showOutputPanel = true;
            $scope.errorMessage = 'dummy error message';
            $scope.undeploy = {
                deleteBlueprints : $scope.deleteBlueprints,
                deleteDeployments : $scope.deleteDeployments,
                killExistingManager : $scope.killExistingManager,
                existingMngrIPaddress : $scope.data.existingMngrIPaddress
            };


            var toasterMessage = "Undeployment has been launched:<br/>";
            if ( $scope.deleteDeployments ) {
                toasterMessage += "*  Uninstalling all the applications<br/>";
                toasterMessage += "*  Undeploying all the deployments<br/>";
            }

            if ( $scope.deleteBlueprints ) {
                toasterMessage += "*  Deleting all the blueprints<br/>";
            }

            if ( $scope.killExistingManager ) {
                toasterMessage += "*  Uninstalling the Cloudify manager<br/>";
                toasterMessage += "*  Deleting the Cloudify manager's vm<br/>";
            }
            toastr.success(toasterMessage);
            DeploymentToolClient.undeploy( $scope.undeploy).then(
                function success (){
                    $modalInstance.close();
                },
                function error( result ){
                    $scope.errorMessage = 'ERROR: ' + result.data;
                }
            );

        };
    });
