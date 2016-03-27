var path = require('path');
var _ = require('lodash');
var config = require( path.join(__dirname, 'prod.json' ) );
var logger = require('log4js').getLogger('config');

try{
    config = _.merge(module.exports, {}, config, require( process.env.CONF_OVERRIDES_PATH || path.join(__dirname,'..','..','dev','overrides.json')));
}catch(e){
    logger.warn('overrides configuration file is missing. using default values');
}
