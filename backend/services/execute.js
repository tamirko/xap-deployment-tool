'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

function getFileFromId( id ){
    return path.resolve('dev/output_' + id + '.log');
}

/**
 *
 * @param prefix - any string with meaning
 * @returns {string} some unique id for execution of format  [prefix_time_random] or [time_random] if prefix does not exist
 */
exports.getExecutionId = function( prefix ){
    return ( _.isEmpty(prefix) ? '' : ( prefix + '_' ) ) +
        new Date().getTime() + '_' +
        Math.floor(Math.random() * 900) + 100;
};

exports.writeInputsFile = function( executionId, input, callback ){
    fs.writeFile(path.resolve('dev/'+executionId+'_input.json'),JSON.stringify(input,{},4), callback);

};

exports.runDeploy = function( theCurrentProvider,executionId, input ){
    var spawn = require('child_process').spawn;
    var lowerCasedProvider = theCurrentProvider.toLowerCase() ;
    var opts = {
        CFY_PROVIDER: theCurrentProvider,
        CFY_VERSION: input.cfyversion,
        CFY_APPURL: input.appurl,
        CFY_APPSOURCE: input.appsource,
        CFY_APPNAME: input.appname,
        CFY_BLUEPRINT: input.name,
        CFY_DEPLOYMENT: input.deployment,
        CFY_CFYMNGRIP: input.cfymngrip,
        CFY_SLUSERNAME: input.slusername ,
        CFY_LOGIN_USER: input.user ,
        CFY_APIKEY: input.apikey ,
        CFY_EMAILS: input.emails,
        CFY_FOLDER: executionId,
        CFY_MANAGER_MORE_PROPERTIES:input.managermoreprops,
        APPLICATION_SOURCE:input.applicationSources,
        APPLICATION_NAME:input.applicationName,
        BLUEPRINT_NAME:input.blueprintName,
        UPLOAD_BLUEPRINT:input.uploadBlueprint,
        BLUEPRINT_FILENAME:input.blueprintFileName,
        NUMBER_OF_NODE_TEMPLATES: input.actualNodeTemplates.length,
        DEPLOY_APPLICATION: input.deployApplication,
        DEPLOYMENT_NAME: input.deploymentName,
        DEPLOY_DEFAULT_XAP_APPS: input.deployDefaultXapApps //,
        //NUMBER_OF_CONTAINERS: input.xxxxxx,
        //GSC_PER_CONTAINER: input.xxxx
        //XAP_GSC_OPTIONS: input.xxxx
    };

    if ( opts.APPLICATION_SOURCE == 2 ) {
        opts.GITHUB_URL = input.githuburl;
        opts.GITHUB_TAG = input.githubtag;
        opts.GITHUB_BRANCH = input.githubbranch;
        opts.TAG_BRANCH_TYPE = input.tagBranchTypes;
    }

    exports.populate_node_templates(opts, executionId, input);


    console.log('input.keystonetenant ' + input.keystonetenant);
    switch (lowerCasedProvider) {
        case 'azure':
            opts.CFY_AZURE_CLIENTID = input.azureclientid;
            opts.CFY_AZURE_TENANTID = input.tenantid;
            opts.CFY_AZURE_ACTIVEDIRECTORY_PASSW = input.aadpassword;
            opts.CFY_AZURE_LOCATION = input.azurelocation;
            opts.CFY_AZURE_MANAGER_VM_SIZE = input.managervmsize;
            opts.CFY_AZURE_MANAGER_VM_PREFIX = input.managervmprefix;
            opts.CFY_AZURE_MANAGER_VM_SSH_USERNAME = input.managersshuser;
            opts.CFY_AZURE_MANAGER_VM_OS = input.managerazureos;
            opts.CFY_AZURE_MANAGER_RESOURCE_GROUP = input.managerresourcegroup;
            opts.CFY_AZURE_MANAGER_USE_EXISTING_RESOURCE_GROUP = input.useExistingResourceGroup;
            opts.CFY_AZURE_MANAGER_STORAGE_ACCOUNT = input.managerstorageaccount;
            opts.CFY_AZURE_MANAGER_USE_EXISTING_STORAGE_ACCOUNT = input.useExistingStorageAccount;
            opts.CFY_AZURE_MANAGER_VNET = input.managervnet;
            opts.CFY_AZURE_MANAGER_USE_EXISTING_VNET = input.useExistingVnet;
            opts.CFY_AZURE_MANAGER_SUBNET = input.managersubnetname;
            opts.CFY_AZURE_MANAGER_USE_EXISTING_SUBNET = input.useExistingSubnet;
            opts.CFY_AZURE_MANAGER_SECURITY_GROUP = input.managersecuritygroup;
            opts.CFY_AZURE_MANAGER_USE_EXISTING_SECURITY_GROUP = input.useExistingSecurityGroup;

            opts.CFY_AZURE_EXISTING_MANAGER_IP_ADDRESS = input.existingMngrIPaddress;
            opts.CFY_AZURE_USE_EXISTING_MANAGER = input.usingExistingManager;
            opts.CFY_AZURE_FREEZE_MANAGER_ON_FAILURE = input.freezeManagerOnFailure;
            break;
        case 'openstack':
            opts.CFY_OPENSTACK_API_KEY = input.apiKey;
            break;
        case 'datacentred':
            opts.DATA_CENTRED_KEYSTONE_PASSWORD = input.keystonepassword;
            opts.DATA_CENTRED_KEYSTONE_TENANT_NAME = input.keystonetenant;
            opts.DATA_CENTRED_KEYSTONE_URL = input.keystoneurl;


            opts.CFY_DATA_CENTRED_REGION = input.region;

            opts.CFY_DATA_CENTRED_OS = input.datacentredos;
            opts.CFY_DATA_CENTRED_MANAGER_SSH_USER = input.managersshuser;
            opts.CFY_DATA_CENTRED_DATACENTRED_FLAVOR = input.datacentredflavor;
            opts.CFY_DATA_CENTRED_AGENT_SSH_USER = input.agentshuser;
            opts.CFY_DATA_CENTRED_SERVER_NAME = input.servername;
            opts.CFY_DATA_CENTRED_MANAGEMENT_NETWORK_NAME = input.managementnetworkname;
            opts.CFY_DATA_CENTRED_MANAGEMENT_SUBNET_NAME = input.managementsubnetname;


            opts.CFY_DATA_CENTRED_EXTERNAL_NETWORK_NAME = input.externalnetworkname;
            opts.CFY_DATA_CENTRED_MANAGEMENT_ROUTER = input.managementrouter;
            opts.CFY_DATA_CENTRED_MANAGER_PORT_NAME = input.managerportname;
            opts.CFY_DATA_CENTRED_MANAGER_SECURITY_GROUP = input.managersecuritygroup;
            opts.CFY_DATA_CENTRED_AGENT_SECURITY_GROUP= input.agentsecuritygroup;
            opts.CFY_DATA_CENTRED_SSH_KEY_FILE_NAME = input.sshkeyfilename;
            opts.CFY_DATA_CENTRED_AGENT_PRIVATE_KEY_PATH = input.agentprivatekeypath;
            opts.CFY_DATA_CENTRED_MANAGER_PUBLIC_KEY_NAME = input.managerpublickeyname;
            opts.CFY_DATA_CENTRED_AGENT_PUBLIC_KEY_NAME = input.agentpublickeyname;

            opts.CFY_DATA_CENTRED_EXISTING_MANAGER_IP_ADDRESS = input.existingMngrIPaddress;
            opts.CFY_DATA_CENTRED_USE_EXISTING_MANAGER = input.usingExistingManager;
            opts.CFY_DATA_CENTRED_FREEZE_MANAGER_ON_FAILURE = input.freezeManagerOnFailure;
            break;
    }

    exports.streamToFile( executionId, spawn('bash', ['./scripts/run_deploy.sh' ,executionId] , { env: opts }));
};

exports.populate_node_templates = function(opts, executionId, input){
    var i=0;
    var templateNameVarName
    for (; i<input.actualNodeTemplates.length; i+=1) {
        if ( input.actualNodeTemplates[i].name != undefined ) {
            templateNameVarName = "opts.NODE_TEMPLATE_"+(i+1)+"_NAME";
            eval(templateNameVarName+"=\""+input.actualNodeTemplates[i].name+"\"");
        }
        if ( input.actualNodeTemplates[i].datacentredos != undefined ) {
            templateNameVarName = "opts.NODE_TEMPLATE_"+(i+1)+"_DATACENTRED_OS";
            eval(templateNameVarName+"=\""+input.actualNodeTemplates[i].datacentredos+"\"");
        }
        if ( input.actualNodeTemplates[i].datacentredflavor != undefined ) {
            templateNameVarName = "opts.NODE_TEMPLATE_"+(i+1)+"_DATACENTRED_FLAVOR";
            eval(templateNameVarName+"=\""+input.actualNodeTemplates[i].datacentredflavor+"\"");
        }
        if ( input.actualNodeTemplates[i].agentshuser != undefined ) {
            templateNameVarName = "opts.NODE_TEMPLATE_"+(i+1)+"_DATACENTRED_AGENT_USER";
            eval(templateNameVarName+"=\""+input.actualNodeTemplates[i].agentshuser+"\"");
        }
        if ( input.actualNodeTemplates[i].containersamount != undefined ) {
            templateNameVarName = "opts.NODE_TEMPLATE_"+(i+1)+"_DATACENTRED_CONTAINERS_AMOUNT";
            eval(templateNameVarName+"=\""+input.actualNodeTemplates[i].containersamount+"\"");
        }
        if ( input.actualNodeTemplates[i].gscs != undefined ) {
            templateNameVarName = "opts.NODE_TEMPLATE_"+(i+1)+"_DATACENTRED_GSCS_PER_VM";
            eval(templateNameVarName+"=\""+input.actualNodeTemplates[i].gscs+"\"");
        }
        if ( input.actualNodeTemplates[i].xapGscOption != undefined ) {
            templateNameVarName = "opts.NODE_TEMPLATE_"+(i+1)+"_DATACENTRED_XAP_GSC_OPTIONS";
            eval(templateNameVarName+"=\""+input.actualNodeTemplates[i].xapGscOption+"\"");
        }
        if ( input.actualNodeTemplates[i].moreprops != undefined ) {
            templateNameVarName = "opts.NODE_TEMPLATE_"+(i+1)+"_DATACENTRED_MORE_PROPS";
            eval(templateNameVarName+"=\""+input.actualNodeTemplates[i].moreprops+"\"");
        }
    }
}

/**
 *
 * @param executionId
 * @param {object} input
 * @param {'true'|'false'|null} input.deleteDeployments
 * @param {'true'|'false'|null} input.deleteBlueprints
 * @param {string} input.killExistingManager
 * @param {string} input.existingMngrIPaddress!ca
 */
exports.runUndeploy = function(executionId, input){
    var spawn = require('child_process').spawn;
    var opts = { DELETE_DEPLOYMENTS: input.deleteDeployments, DELETE_BLUEPRINTS: input.deleteBlueprints, KILL_MANAGER: input.killExistingManager, MANAGER_IP: input.existingMngrIPaddress };
    exports.streamToFile(executionId, spawn('bash', ['./scripts/run_undeploy.sh', executionId], {env:opts}));
};

exports.streamToFile = function( executionId , child ){
        var outputStream = fs.createWriteStream( getFileFromId(executionId), {flags: 'a'});
        child.stdout.pipe(outputStream);
        child.stderr.pipe(outputStream);
};

exports.getOutputStream = function( executionId ){
    return fs.createReadStream( getFileFromId(executionId) );
};
