'use strict';

/**
 * @ngdoc service
 * @name demoApp.StepsService
 * @description
 * # StepsService
 * Service in the demoApp.
 */
angular.module('demoApp')
  .service('StepsService', function ( $stateParams, $state, $location ) {

        var me = this;

        this.goToStep =  function goToStep(step){
            $location.path('/deploy/' + $stateParams.provider + '/' + step.slug );
        };


        this.isCurrentStep = function isCurrentStep(step){
            return step.slug === $stateParams.step;
        };

        this.getSteps = function(){
            return $stateParams.deploySteps;
        };

        this.getCurrentStep = function getCurrentStep(){
            return _.find(me.getSteps(), me.isCurrentStep );
        };

        this.getRelativeStep = function( relation ){
            // very inefficient, but in real world no effect
            var currentStepIndex = _.indexOf(me.getSteps(),me.getCurrentStep());
            var goToIndex = currentStepIndex + relation;
            return me.getSteps()[goToIndex];
        };

        this.nextStep = function(){

            me.goToStep(me.getRelativeStep(1));
        };

        this.previousStep = function(){
            me.goToStep(me.getRelativeStep(-1));
        };


        this.hasNextStep = function hasNextStep(){
            return !me.isCurrentStep(_.last(me.getSteps()));
        };

        this.hasPreviousStep = function hasPreviousStep(){
            return !me.isCurrentStep(_.first(me.getSteps()));
        };
  });
