'use strict';

/**
 * @ngdoc directive
 * @name demoApp.directive:deployConsoleOutput
 * @description
 * # deployConsoleOutput
 */
angular.module('demoApp')
    .directive('deployConsoleOutput', function () {
        return {
            templateUrl: 'views/directives/deploy_console_output.html',
            restrict: 'C',
            scope: {
                'onClose': '&',
                'outputId' : '='

            },
            controller: function( $scope, DeploymentToolClient, $interval ){

                // polling
                $scope.myClose = function() {
                    stopPolling();
                    if ( typeof ( $scope.onClose) === 'function' ){
                        $scope.onClose();
                    }
                };


                var timer = null;

                function startPolling(outputId){
                    timer = $interval(function(){
                        DeploymentToolClient.getOutput(outputId).then(function( result ){
                            $scope.output = result.data;
                        });
                    }, 1000);
                }

                function stopPolling() {
                    $interval.cancel(timer);
                }

                $scope.$on('$destroy', function(){
                    stopPolling();
                });

                $scope.$watch('outputId', function(newValue, oldValue ){
                    if ( newValue !== oldValue ){
                        $scope.output = null;
                    }
                    if ( !newValue && !!timer  ){
                        $interval.cancel(timer);
                    }else if ( !!newValue ){
                        startPolling(newValue);
                    }
                });
            }
        };
    });
