'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var logger = require('log4js').getLogger('routes');
var async=require('async');

var services = require('../services');




/* GET home page. */
router.post('/submit', function (req, res) {
    var input = req.body;
    logger.info("index.js submit req.body.provider is : " , req.body.provider);
    logger.info("index.js submit input.user is : " , input.user);
    var executionId = services.execute.getExecutionId(input.user);
    async.waterfall(
        [
            function( done ) {
                services.execute.writeInputsFile(executionId, input, done);
            },
            function( done ){
                services.execute.runDeploy( req.body.provider, executionId, input); // don't wait for callback on purpose
                done();
            }
        ],
        function doneAll( error ){
            if ( !!error ){
                res.status(500).send({'message' : 'something is wrong'});
                return;
            }
            res.status(200).send({'outputId': executionId}); // todo: change this to executionId
        }
    );
});

router.post('/undeploy', function( req, res ){
    var input = req.body;
    var executionId = services.execute.getExecutionId('undeploy');
    async.waterfall(
        [
            function( done ){
                services.execute.runUndeploy(executionId,input);
                done();
            }
        ],
        function doneAll(error){
            if (!!error){
                logger.error('unable to undeploy',error);
                res.status(500).send({'message' :'something is wrong in undeploy'});
                return;
            }

            res.status(200).send({'executionId' :executionId});
        }
    );
});

router.get('/:id/output', function(req, res){
    services.execute.getOutputStream(req.params.id).pipe(res);
});

router.get('/config', function(req, res){
    if ( req.query.jsonp ){
        res.send('var ' + req.query.jsonp + ' = ' + JSON.stringify(services.config.public));
    }else{
        res.send(services.config.public);
    }
});

router.get('/test', function(req, res){
    res.status(200).send('hello world!');
});

module.exports = router;
