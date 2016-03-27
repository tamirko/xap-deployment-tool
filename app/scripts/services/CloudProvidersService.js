'use strict';

/**
 * @ngdoc service
 * @name demoApp.CloudProvidersService
 * @description
 * # CloudProvidersService
 * Service in the demoApp.
 */
angular.module('demoApp')
    .service('CloudProvidersService', function () {
        this.items = [
            {
                'id' : 'azure'
            },{
                'id' : 'datacentred'
            },{
                'id' : 'amazon'
            },{
                'id' : 'softlayer'
            },{
                'id' : 'openstack'
            },{
                'id' : 'hostpool'
            }
        ];

        this.getById = function(id){
            return _.find(this.items, { 'id' : id });
        };

        _.each(this.items, function( item ){
			var current_label = item.id.toLowerCase();
            item.label = current_label.substring(0,1).toUpperCase()+current_label.substring(1);
        });

    });
