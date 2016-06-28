#! /bin/bash -x

echo " "
echo "============================================================="
export date1=`date +%m/%d/%Y\ %H:%M:%S`
echo The time and date is $date1
currLog="`pwd`/dev/output_${CFY_FOLDER}.log"
export DT_EXECUTIONS_ROOT=~/dt_executions
mkdir -p ${DT_EXECUTIONS_ROOT}
export CFY_VERSIONS_ROOT=~/cfy_versions_root
mkdir -p ${CFY_VERSIONS_ROOT}
executionID=${CFY_FOLDER}
echo Execution ID: ${executionID}F
executionFolder=${DT_EXECUTIONS_ROOT}/${executionID}
mkdir -p ${executionFolder}
echo Execution folder is ${executionFolder}
echo Log file is in ${currLog}

export cfyScript=`pwd`/scripts/installCfy.sh
export mystuffFile=`pwd`/scripts/mystuff
success=1


export RAW_CFY_VERSION=`echo $CFY_VERSION | tr '.' '_' | tr [A-Z] [a-z]`
export CFY_MINOR_VERSION=`echo ${CFY_VERSION:0:5}`
if [ ${CFY_MINOR_VERSION:${#CFY_MINOR_VERSION}-1:1} == "0" ]; then
    export CFY_MINOR_VERSION=`echo ${CFY_VERSION:0:3}`
fi

export PLUGINS_MINOR_VERSION=`echo 1${CFY_MINOR_VERSION:1:5}`
strLen=${#CFY_VERSION}
export CFY_GIT_TAG_BRANCH=`echo ${CFY_VERSION:5:$strLen} | tr [A-Z] [a-z]`
export PLUGINS_GIT_TAG_BRANCH=`echo ${CFY_GIT_TAG_BRANCH} | tr 'm' 'a'`

export DEPLOYMENT_TOOL_ENVS_ROOT=~/deployment_tool_envs
export current_venv_name=cfy_${RAW_CFY_VERSION}_env
export current_venv_path=${DEPLOYMENT_TOOL_ENVS_ROOT}/${current_venv_name}
export current_venv_activate=${current_venv_path}/bin/activate


function add_inputs {
	# $1 is the output file's full path
	# $2 is the comma separated list
	currentList=$2
	if [ "${currentList}" == "" ] || [ "${currentList}" == "undefined" ]; then
		echo "There are no additional inputs."
		return 0
	fi

	echo "Additional inputs are ${currentList}"
	arr=$(echo $currentList | tr "," "\n")
    pwd
	for x in ${arr[@]}
	do
		currkey=`echo $x | awk -F"=" '{print $1}'`
		currval=`echo $x | awk -F"=" '{print $2}'`

		currKeyCounter=`grep -cE "^${currkey}:" $1`
		if [ $currKeyCounter -eq 0 ]; then
		    echo "Adding $currkey: '$currval' to $1..."
		    echo "$currkey: '${currval}'">>$1
		else
		    echo "Ignoring ${currkey}, since it's already in the inputs of $1"
		fi
	done
}


function set_virtualenv {
    echo "============================================================="
    echo "${FUNCNAME[0]}: execution id : $1"
    if [ ! -f ${current_venv_activate} ]; then
        pushd ${DEPLOYMENT_TOOL_ENVS_ROOT}
        echo "Creating virtualenv: '${current_venv_name}' ..."
        virtualenv ${current_venv_name}
        popd
    fi

    echo "Activating virtualenv '${current_venv_name}'"

    source ${current_venv_activate}
}

function install_cfy {
    echo "============================================================="
    echo "${FUNCNAME[0]}: execution id : $1"

    #echo "Required CFY VERSION : $CFY_VERSION"
    #echo CFY_MINOR_VERSION is ${CFY_MINOR_VERSION}
    #echo PLUGINS_MINOR_VERSION is ${PLUGINS_MINOR_VERSION}
    #echo CFY_GIT_TAG_BRANCH is ${CFY_GIT_TAG_BRANCH}
    #echo PLUGINS_GIT_TAG_BRANCH is ${PLUGINS_GIT_TAG_BRANCH}
    CFY_VERSION_FOLDER=$CFY_MINOR_VERSION/$CFY_GIT_TAG_BRANCH
    pushd ${CFY_VERSIONS_ROOT}
    chmod +x $cfyScript
    $cfyScript
    popd
}

function install_cfy_cloud_provider_plugin {
    #echo "============================================================="
    #echo "${FUNCNAME[0]}: execution id : $1"

    if [ "${CFY_LOGIN_USER}" == "default" ]; then
        if [ -f "${mystuffFile}" ]; then
            #echo "Sourcing from ${mystuffFile} ..."
            source ${mystuffFile}
        fi
    fi

    if [ "${BLUEPRINT_NAME}" == "undefined" ]; then
        export BLUEPRINT_NAME=""
    fi

    if [ "${DEPLOY_APPLICATION}" == "undefined" ]; then
        export DEPLOY_APPLICATION="false"
    else
        if [ "${DEPLOY_APPLICATION}" == "true" ]; then
            if [ "undefined" == "${APPLICATION_NAME}" ] || [ "" == "${APPLICATION_NAME}" ] || [ "*" == "${APPLICATION_NAME}" ]; then
                export DEPLOY_APPLICATION="false"
            fi
        else
            export DEPLOY_APPLICATION="false"
        fi
    fi

    #echo "Cloud Provider                           : ${CFY_PROVIDER}"
    #echo "Cloud user name                          : ${CFY_LOGIN_USER}"
    #echo "Application name                         : ${APPLICATION_NAME}"
    #echo "Upload Blueprints ?                      : ${UPLOAD_BLUEPRINT}"
    #echo "Blueprint suffix                         : ${BLUEPRINT_NAME}"
    #echo "Blueprint file name                      : ${BLUEPRINT_FILENAME}"
    #echo "Deploy_Application ?                     : ${DEPLOY_APPLICATION}"
    #echo "Deployment name                          : ${DEPLOYMENT_NAME}"
    case ${CFY_PROVIDER} in
    "azure")
        #echo "Client ID                                : ${CFY_AZURE_CLIENTID}"
        #echo "Tenant ID                                : ${CFY_AZURE_TENANTID}"
        #echo "Active Directory password               : ${CFY_AZURE_ACTIVEDIRECTORY_PASSW}"
        echo "Manager VM location                      : ${CFY_AZURE_LOCATION}"
        echo "Manager VM size                          : ${CFY_AZURE_MANAGER_VM_SIZE}"
        echo "Manager VM prefix                        : ${CFY_AZURE_MANAGER_VM_PREFIX}"
        echo "Manager VM SSH username                  : ${CFY_AZURE_MANAGER_VM_SSH_USERNAME}"
        echo "Manager VM operating system              : ${CFY_AZURE_MANAGER_VM_OS}"
        echo "Manager VM resource group                : ${CFY_AZURE_MANAGER_RESOURCE_GROUP}"
        echo "Manager VM uses existing resource group  : ${CFY_AZURE_MANAGER_USE_EXISTING_RESOURCE_GROUP}"
        echo "Manager VM storage account               : ${CFY_AZURE_MANAGER_STORAGE_ACCOUNT}"
        echo "Manager VM uses existing storage account : ${CFY_AZURE_MANAGER_USE_EXISTING_STORAGE_ACCOUNT}"
        echo "Manager VM Vnet                          : ${CFY_AZURE_MANAGER_VNET}"
        echo "Manager VM uses existing Vnet            : ${CFY_AZURE_MANAGER_USE_EXISTING_VNET}"
        echo "Manager VM subnet                        : ${CFY_AZURE_MANAGER_SUBNET}"
        echo "Manager VM uses existing subnet          : ${CFY_AZURE_MANAGER_USE_EXISTING_SUBNET}"

        echo "Manager VM security group                : ${CFY_AZURE_MANAGER_SECURITY_GROUP}"
        echo "Manager VM uses existing security group  : ${CFY_AZURE_MANAGER_USE_EXISTING_SECURITY_GROUP}"

        echo "Existing Manager IP address              : ${CFY_AZURE_EXISTING_MANAGER_IP_ADDRESS}"
        CFY_EXISTING_MANAGER_IP_ADDRESS=${CFY_AZURE_EXISTING_MANAGER_IP_ADDRESS}
        echo "Use existing Manager                     : ${CFY_AZURE_USE_EXISTING_MANAGER}"
        CFY_USE_EXISTING_MANAGER=${CFY_AZURE_USE_EXISTING_MANAGER}
        echo "Freeze the manager on failure            : ${CFY_AZURE_FREEZE_MANAGER_ON_FAILURE}"
        CFY_FREEZE_MANAGER_ON_FAILURE=${CFY_AZURE_FREEZE_MANAGER_ON_FAILURE}
        export manager_blueprint_file=${CFY_VERSIONS_ROOT}/${CFY_MINOR_VERSION}/${CFY_GIT_TAG_BRANCH}/cloudify-manager-blueprints/azure-manager-blueprint.yaml
        echo "manager_blueprint_file                   : ${manager_blueprint_file}"
        export manager_blueprint_inputs_file=${CFY_VERSIONS_ROOT}/${CFY_MINOR_VERSION}/${CFY_GIT_TAG_BRANCH}/cloudify-manager-blueprints/azure-manager-blueprint-inputs.yaml
        echo "manager_blueprint_inputs_file            : ${manager_blueprint_inputs_file}"
        ;;
    "openstack")
        echo "CFY_OPENSTACK_API_KEY  is ${CFY_OPENSTACK_API_KEY} ..."
        ;;
    "datacentred")
        #echo "DATA_CENTRED_KEYSTONE_PASSWORD           : ${DATA_CENTRED_KEYSTONE_PASSWORD} ..."
        #echo "DATA_CENTRED_KEYSTONE_TENANT_NAME        : ${DATA_CENTRED_KEYSTONE_TENANT_NAME} ..."
        #echo "DATA_CENTRED_KEYSTONE_URL                : ${DATA_CENTRED_KEYSTONE_URL} ..."

        #echo "CFY_DATA_CENTRED_REGION                  : ${CFY_DATA_CENTRED_REGION} ..."

        #echo "CFY_DATA_CENTRED_OS                      : ${CFY_DATA_CENTRED_OS} ..."
        #echo "CFY_DATA_CENTRED_MANAGER_SSH_USER        : ${CFY_DATA_CENTRED_MANAGER_SSH_USER} ..."

        #echo "CFY_DATA_CENTRED_DATACENTRED_FLAVOR      : ${CFY_DATA_CENTRED_DATACENTRED_FLAVOR} ..."
        #echo "CFY_DATA_CENTRED_AGENT_SSH_USER          : ${CFY_DATA_CENTRED_AGENT_SSH_USER} ..."
        #echo "CFY_DATA_CENTRED_SERVER_NAME             : ${CFY_DATA_CENTRED_SERVER_NAME} ..."


        #echo "CFY_DATA_CENTRED_EXTERNAL_NETWORK_NAME   : ${CFY_DATA_CENTRED_EXTERNAL_NETWORK_NAME} ..."
        #echo "CFY_DATA_CENTRED_MANAGEMENT_NETWORK_NAME : ${CFY_DATA_CENTRED_MANAGEMENT_NETWORK_NAME} ..."
        #echo "CFY_DATA_CENTRED_MANAGEMENT_SUBNET_NAME  : ${CFY_DATA_CENTRED_MANAGEMENT_SUBNET_NAME} ..."

        #echo "CFY_DATA_CENTRED_MANAGEMENT_ROUTER       : ${CFY_DATA_CENTRED_MANAGEMENT_ROUTER} ..."
        #echo "CFY_DATA_CENTRED_MANAGER_PORT_NAME       : ${CFY_DATA_CENTRED_MANAGER_PORT_NAME} ..."
        #echo "CFY_DATA_CENTRED_MANAGER_SECURITY_GROUP  : ${CFY_DATA_CENTRED_MANAGER_SECURITY_GROUP} ..."

        #echo "CFY_DATA_CENTRED_AGENT_SECURITY_GROUP    : ${CFY_DATA_CENTRED_AGENT_SECURITY_GROUP} ..."
        #echo "CFY_DATA_CENTRED_SSH_KEY_FILE_NAME       : ${CFY_DATA_CENTRED_SSH_KEY_FILE_NAME} ..."
        #echo "CFY_DATA_CENTRED_AGENT_PRIVATE_KEY_PATH  : ${CFY_DATA_CENTRED_AGENT_PRIVATE_KEY_PATH} ..."

        #echo "CFY_DATA_CENTRED_MANAGER_PUBLIC_KEY_NAME : ${CFY_DATA_CENTRED_MANAGER_PUBLIC_KEY_NAME} ..."
        #echo "CFY_DATA_CENTRED_AGENT_PUBLIC_KEY_NAME   : ${CFY_DATA_CENTRED_AGENT_PUBLIC_KEY_NAME} ..."

        #echo "Existing Manager IP address              : ${CFY_DATA_CENTRED_EXISTING_MANAGER_IP_ADDRESS}"
        CFY_EXISTING_MANAGER_IP_ADDRESS=${CFY_DATA_CENTRED_EXISTING_MANAGER_IP_ADDRESS}
        #echo "Use existing Manager                     : ${CFY_DATA_CENTRED_USE_EXISTING_MANAGER}"
        CFY_USE_EXISTING_MANAGER=${CFY_DATA_CENTRED_USE_EXISTING_MANAGER}
        #echo "Freeze the manager on failure            : ${CFY_DATA_CENTRED_FREEZE_MANAGER_ON_FAILURE}"
        CFY_FREEZE_MANAGER_ON_FAILURE=${CFY_DATA_CENTRED_FREEZE_MANAGER_ON_FAILURE}
        export manager_blueprint_file=${CFY_VERSIONS_ROOT}/${CFY_MINOR_VERSION}/${CFY_GIT_TAG_BRANCH}/cloudify-manager-blueprints/openstack-manager-blueprint.yaml
        #echo "manager_blueprint_file                   : ${manager_blueprint_file}"
        export manager_blueprint_inputs_file=${CFY_VERSIONS_ROOT}/${CFY_MINOR_VERSION}/${CFY_GIT_TAG_BRANCH}/cloudify-manager-blueprints/openstack-manager-blueprint-inputs.yaml
        #echo "manager_blueprint_inputs_file            : ${manager_blueprint_inputs_file}"

        ;;
    *)
        echo "Error Unknown cloud provider"
        echo "Aborting..."
        exit 1
        ;;
    esac
}


function pre_bootstrap {
    echo "============================================================="
    #echo "${FUNCNAME[0]}: execution id : $1"
}

function azure_init_bootstrap {
    echo "-------------------------------------------------------------"
    echo "${FUNCNAME[0]}: execution id : $1"
    sed -i -e "s/\(subscription_id:\)\(.*\)/\1 '$CFY_LOGIN_USER'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(location:\)\(.*\)/\1 '$CFY_AZURE_LOCATION'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(vm_prefix:\)\(.*\)/\1 '$CFY_AZURE_MANAGER_VM_PREFIX'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(vm_size:\)\(.*\)/\1 '$CFY_AZURE_MANAGER_VM_SIZE'/g" ${current_bootstrap_inputs_file}

    ospublisher=`echo $CFY_AZURE_MANAGER_VM_OS | awk -F"," '{ print $1}'`
    osoffer=`echo $CFY_AZURE_MANAGER_VM_OS | awk -F"," '{ print $2}'`
    ossku=`echo $CFY_AZURE_MANAGER_VM_OS | awk -F"," '{ print $3}'`
    sed -i -e "s/\(image_reference_publisher:\)\(.*\)/\1 '$ospublisher'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(image_reference_offer:\)\(.*\)/\1 '$osoffer'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(image_reference_sku:\)\(.*\)/\1 '$ossku'/g" ${current_bootstrap_inputs_file}

    sed -i -e "s/\(client_id:\)\(.*\)/\1 '$CFY_AZURE_CLIENTID'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(tenant_id:\)\(.*\)/\1 '$CFY_AZURE_TENANTID'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(existing_resource_group_name:\)\(.*\)/\1 '$CFY_AZURE_MANAGER_RESOURCE_GROUP'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(existing_storage_account_name:\)\(.*\)/\1 '$CFY_AZURE_MANAGER_STORAGE_ACCOUNT'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(existing_vnet_name:\)\(.*\)/\1 '$CFY_AZURE_MANAGER_VNET'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(subnet:\)\(.*\)/\1 '$CFY_AZURE_MANAGER_SUBNET'/g" ${current_bootstrap_inputs_file}
    sed -i -e "s/\(ssh_user:\)\(.*\)/\1 '$CFY_AZURE_MANAGER_VM_SSH_USERNAME'/g" ${current_bootstrap_inputs_file}

    path_private_key="/home/`whoami`/.ssh/id_rsa_$1"
    ssh-keygen -t rsa -C "$1@gigaspaces.com" -f "${path_private_key}" -q -N ""
    ssh-keygen -e -f ${path_private_key}.pub >${path_private_key}2.pub
    sed -i -e "s+\(agent_local_key_path:\)\(.*\)+\1 '$path_private_key'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(ssh_key_filename:\)\(.*\)+\1 '$path_private_key'+g" ${current_bootstrap_inputs_file}

    sed -i -e "s/\(aad_password:\)\(.*\)/\1 '$CFY_AZURE_ACTIVEDIRECTORY_PASSW'/g" ${current_bootstrap_inputs_file}

    keyDataLine=`grep -n "key_data" ${current_bootstrap_inputs_file}  | cut -d: -f1`
    #echo "keyDataLine -${keyDataLine}-"
    head -n $keyDataLine ${current_bootstrap_inputs_file}> yyy
    sed 's/\(.*\)/   \1/g' ${path_private_key}2.pub >>  yyy
    inputFileLines=`wc -l ${current_bootstrap_inputs_file} | cut -d' ' -f1`
    blankLine=`sed -n ${keyDataLine},${inputFileLines}p $current_bootstrap_inputs_file | grep -nE "^$" | head -1 | sed 's/://g'`
    #echo "blankLine ${blankLine}"
    fromBlankLineTillEnd=$((inputFileLines - blankLine - keyDataLine + 2))
    #echo "fromBlankLineTillEnd ${fromBlankLineTillEnd}"
    tail -n ${fromBlankLineTillEnd} $current_bootstrap_inputs_file >> yyy
    mv yyy ${current_bootstrap_inputs_file}

    #echo ~/dt_executions/$1/${current_bootstrap_inputs_file}
    #cat ~/dt_executions/$1/${current_bootstrap_inputs_file}
}

function datacentred_init_bootstrap {
    echo "-------------------------------------------------------------"
    echo "${FUNCNAME[0]}: execution id : $1"

    sed -i -e "s+\(keystone_username:\)\(.*\)+\1 '$CFY_LOGIN_USER'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(keystone_password:\)\(.*\)+\1 '$DATA_CENTRED_KEYSTONE_PASSWORD'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(keystone_tenant_name:\)\(.*\)+\1 '$DATA_CENTRED_KEYSTONE_TENANT_NAME'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(keystone_url:\)\(.*\)+\1 '$DATA_CENTRED_KEYSTONE_URL'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(region:\)\(.*\)+\1 '$CFY_DATA_CENTRED_REGION'+g" ${current_bootstrap_inputs_file}
    #  sed -i -e "s+\(use_existing_manager_keypair:\)\(.*\)+\1 '$XXX'+g" ${current_bootstrap_inputs_file}
    #  sed -i -e "s+\(use_existing_agent_keypair:\)\(.*\)+\1 '$XXX'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(ssh_key_filename:\)\(.*\)+\1 '$CFY_DATA_CENTRED_SSH_KEY_FILE_NAME'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(agent_private_key_path:\)\(.*\)+\1 '$CFY_DATA_CENTRED_AGENT_PRIVATE_KEY_PATH'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(manager_public_key_name:\)\(.*\)+\1 '$CFY_DATA_CENTRED_MANAGER_PUBLIC_KEY_NAME'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(agent_public_key_name:\)\(.*\)+\1 '$CFY_DATA_CENTRED_AGENT_PUBLIC_KEY_NAME'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(image_id:\)\(.*\)+\1 '$CFY_DATA_CENTRED_OS'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(flavor_id:\)\(.*\)+\1 '$CFY_DATA_CENTRED_DATACENTRED_FLAVOR'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(external_network_name:\)\(.*\)+\1 '$CFY_DATA_CENTRED_EXTERNAL_NETWORK_NAME'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(ssh_user:\)\(.*\)+\1 '$CFY_DATA_CENTRED_MANAGER_SSH_USER'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(manager_server_name:\)\(.*\)+\1 '$CFY_DATA_CENTRED_SERVER_NAME'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(management_network_name:\)\(.*\)+\1 '$CFY_DATA_CENTRED_MANAGEMENT_NETWORK_NAME'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(management_subnet_name:\)\(.*\)+\1 '$CFY_DATA_CENTRED_MANAGEMENT_SUBNET_NAME'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(management_router:\)\(.*\)+\1 '$CFY_DATA_CENTRED_MANAGEMENT_ROUTER'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(manager_security_group_name:\)\(.*\)+\1 '$CFY_DATA_CENTRED_MANAGER_SECURITY_GROUP'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(agents_security_group_name:\)\(.*\)+\1 '$CFY_DATA_CENTRED_AGENT_SECURITY_GROUP'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(manager_port_name:\)\(.*\)+\1 '$CFY_DATA_CENTRED_MANAGER_PORT_NAME'+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+\(agents_user:\)\(.*\)+\1 '$CFY_DATA_CENTRED_AGENT_SSH_USER'+g" ${current_bootstrap_inputs_file}

    # Just in case these are commented :
    sed -i -e "s+#ssh_key_filename:+ssh_key_filename:+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+#agents_user:+agents_user:+g" ${current_bootstrap_inputs_file}

    sed -i -e "s+#agent_private_key_path:+agent_private_key_path:+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+#manager_public_key_name:+manager_public_key_name:+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+#agent_public_key_name:+agent_public_key_name:+g" ${current_bootstrap_inputs_file}

    sed -i -e "s+#manager_server_name:+manager_server_name:+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+#management_network_name:+management_network_name:+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+#management_subnet_name:+management_subnet_name:+g" ${current_bootstrap_inputs_file}

    sed -i -e "s+#management_router:+management_router:+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+#manager_security_group_name:+manager_security_group_name:+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+#agents_security_group_name:+agents_security_group_name:+g" ${current_bootstrap_inputs_file}
    sed -i -e "s+#manager_port_name:+manager_port_name:+g" ${current_bootstrap_inputs_file}

}

function openstack_init_bootstrap {
    echo "-------------------------------------------------------------"
    #echo "${FUNCNAME[0]}: execution id : $1"
}

function run_bootstrap {
    #echo "============================================================="
    #echo "${FUNCNAME[0]}: execution id : $1"
    pushd ${executionFolder}
    cfy --version
    cfy init -r
    if [ "true" == "${CFY_USE_EXISTING_MANAGER}" ]; then
        #echo "Using an existing Cloudify manager"
        if [ "undefined" == "${CFY_EXISTING_MANAGER_IP_ADDRESS}" ] || [ "" == "${CFY_EXISTING_MANAGER_IP_ADDRESS}" ]; then
            echo "There's no IP address for the manager. -Aborting"
            exit
        else
            #echo "CFY_EXISTING_MANAGER_IP_ADDRESS is ${CFY_EXISTING_MANAGER_IP_ADDRESS}"
            #echo "No Need to bootstrap, running cfy use -t ${CFY_EXISTING_MANAGER_IP_ADDRESS}"
            cfy use -t ${CFY_EXISTING_MANAGER_IP_ADDRESS}
        fi
    else
        if [ "true" == "${CFY_FREEZE_MANAGER_ON_FAILURE}" ]; then
            freezeFailure="--keep-up-on-failure "
        else
            freezeFailure=""
        fi
        export current_bootstrap_inputs_file=current_${CFY_PROVIDER}_inputs_file.yaml
        cp ${manager_blueprint_inputs_file} ${current_bootstrap_inputs_file}
        ${CFY_PROVIDER}_init_bootstrap $1
        echo "Running: cfy bootstrap ${freezeFailure}-p ${manager_blueprint_file} -i ${current_bootstrap_inputs_file}"
        cfy bootstrap ${freezeFailure}-p ${manager_blueprint_file} -i ${current_bootstrap_inputs_file}
    fi
}


function pre_blueprint_upload {
    echo "============================================================="
    if [ "${UPLOAD_BLUEPRINT}" == "false" ]; then
        echo "No need to run ${FUNCNAME[0]}."
        return 0
    fi
    #echo "${FUNCNAME[0]}: execution id : $1"
}

function blueprints_upload {
    echo "============================================================="
    if [ "${UPLOAD_BLUEPRINT}" == "false" ]; then
        echo "No need to run ${FUNCNAME[0]} ."
        return 0
    fi
    echo "${FUNCNAME[0]}: execution id : $1"

    if [ "$APPLICATION_SOURCE" == "2" ]; then
        git clone $GITHUB_URL
        if [ $? -gt 0 ]; then
            echo "Failed in git clone $GITHUB_URL ... - Aborting"
            exit
        fi

        export gitRepoFileName=$(basename $GITHUB_URL)
        export gitRepoName=${gitRepoFileName%%.*}
        case ${TAG_BRANCH_TYPE} in
            1)
                if [ "$GITHUB_TAG" != "" ]; then
                    pushd ${gitRepoName}
                    git checkout tags/$GITHUB_TAG
                    if [ $? -gt 0 ]; then
                        echo "Failed in git checkout tags/$GITHUB_TAG ... - Aborting"
                        popd
                        exit
                    fi
                    popd
                else
                    echo "You chose a the GitHub tag option, but you didn't specify such a Tag. - Aborting"
                    exit
                fi
                ;;
            2)
                pushd ${gitRepoName}
                git checkout origin/$GITHUB_BRANCH
                if [ $? -gt 0 ]; then
                    echo "Failed in git checkout origin/$GITHUB_BRANCH ... - Aborting"
                    popd
                    exit
                fi
                popd
                ;;
            *)
                echo "Using the repository's master branch"
                ;;
        esac

        pushd ${gitRepoName}
        for currentApp in $(ls -l | grep -E "^d" | awk -F" " '{print $NF}') ; do
            echo "-------------------------------------------------------------"
            if [ "${APPLICATION_NAME}" == "*" ] || [ "${APPLICATION_NAME}" == "${currentApp}" ]; then
                pushd $currentApp
                #echo "Uploading ${currentApp} ..."
                export currBpName=$currentApp$BLUEPRINT_NAME
                cfy blueprints upload -b $currBpName -p ${BLUEPRINT_FILENAME}
                currStatus=$?
                if [ $currStatus -gt 0 ]; then
                    echo "Failure in ${FUNCNAME[0]}"
                    echo "- Aborting"
                    popd
                    exit
                else
                    echo "Done uploading ${currentApp}"
                    popd
                fi
            fi
        done
        popd
        echo "-------------------------------------------------------------"
    else
        echo "Not using a Git Repository"
    fi
}


function pre_deployment_creation {
    echo "============================================================="
    if [ "${DEPLOY_APPLICATION}" == "false" ]; then
        echo "No need to run ${FUNCNAME[0]} ."
        return 0
    fi
    echo "${FUNCNAME[0]}: execution id : $1"
}

function create_current_node_template_file {
    #echo "-------------------------------------------------------------"
    #echo "${FUNCNAME[0]}: execution id : $1"

    origFilepath=${BLUEPRINT_FILENAME}
    sectionName=$1
    #echo "Looking for section ${sectionName} ..."
    sectionline=`grep -n "${sectionName}:" $origFilepath | cut -d: -f1`
    #echo "sectionline is ${sectionline}"
    [ "${sectionline}" ] && echo "Found the ${sectionName} in line #${sectionline}" || echo "Didn't find section ${sectionName}"
    currStatus=$?
    #echo "currStatus is ${currStatus}"
    preceedingSpaces=`sed -n ${sectionline},${sectionline}p $origFilepath | sed -e "s+\(.*\)\($sectionName\)\(.*\)+\1+g"`
    priorToSection=$((sectionline - 1))
    nextLineAfterSection=$((sectionline + 1))
    origFilepathLines=`wc -l $origFilepath | cut -d' ' -f1`
    fromSectionToEnd=$((origFilepathLines - sectionline))
    #echo "Total lines $origFilepathLines"
    #echo "fromSectionToEnd $fromSectionToEnd"
    nextSectionExists=`tail -n $fromSectionToEnd $origFilepath | grep -nE "^$preceedingSpaces[a-z|A-Z]" | grep -v "#" | head -1 | grep -cE "[0-9]"`
    if [ $nextSectionExists -eq 0 ]; then
        echo "$sectionName is the last section"
    else
        nextSectionLine=`tail -n $fromSectionToEnd $origFilepath | grep -nE "^$preceedingSpaces[a-z|A-Z]" | grep -v "#" | head -1 | cut -d: -f1`
        endOfSectionLine=$((sectionline + nextSectionLine - 1))
        sed -n ${sectionline},${endOfSectionLine}p $origFilepath>$1
        head -n ${priorToSection} $origFilepath>pre_$1
        #echo "The next section is in line $endOfSectionLine"
        fromNextTillEnd=$((origFilepathLines - endOfSectionLine))
        #echo "From end of next section to the end : tail -n ${fromNextTillEnd}"
        tail -n ${fromNextTillEnd} $origFilepath>post_$1
        tempBpFile=current_bp
        cp pre_$1 $tempBpFile
        cat $1>>$tempBpFile
        #echo -e "\n">>$tempBpFile
        cat post_$1>>$tempBpFile
        #diff $tempBpFile $origFilepath
    fi
    currStatus=$?
    #echo "currStatus is ${currStatus}"
}

function populate_current_node_template {
    echo "-------------------------------------------------------------"
    #echo "${FUNCNAME[0]}: execution id : $1"
    #echo "done"
}

function populate_node_templates {
    echo "============================================================="
    if [ "${DEPLOY_APPLICATION}" == "false" ]; then
        echo "No need to run ${FUNCNAME[0]} ."
        return 0
    fi
    echo "${FUNCNAME[0]}: execution id : $1"

    if [ "${APPLICATION_NAME}" == "*" ]; then
        echo "There's no need to populate any node templates. - Generating a blueprints catalog"
        return 0
    fi

    #pwd
    cd $gitRepoName
    #ls -l $currBpName
    pushd ${APPLICATION_NAME}
    #echo "Populating node templates of the $APPLICATION_NAME application"
    #echo "The blueprint name will be $currBpName"
    #echo "Deployment name is $DEPLOYMENT_NAME"
    #ls -l

    inputsFile=$1_inputs.yaml
    touch $inputsFile

    case ${CFY_PROVIDER} in
    "azure")
        echo "Nothing for Azure ... "
        ;;
    "datacentred")
        y=$NUMBER_OF_NODE_TEMPLATES
        for i in $(seq 1 $y);
        do
          nt="NODE_TEMPLATE_${i}_NAME"
          if [ "${!nt}" ]; then
            #echo $nt is ${!nt}
            create_current_node_template_file ${!nt}
          else
            echo "Warning: $nt is unset. - Ignoring it ..."
          fi


          z="NODE_TEMPLATE_${i}_DATACENTRED_FLAVOR"
          if [ "${!z}" ]; then
            flavorID=${!z}
            #echo "$z is ${flavorID}"
            flavorInputCount=`grep "flavor:" ${!nt} | grep -c get_input`
            if [ $flavorInputCount -eq 1 ]; then
                #echo "Setting the flavor to ${flavorID} in ${!nt}"
                flavorInput=`grep "flavor:" ${!nt} | grep get_input | awk -F":" '{ print $3 }' | sed -e "s+[ }]++g"`
                echo "${flavorInput}: '$flavorID'">>$inputsFile
                sed -i -e "s+\(flavor:\)\(.*\)+\1 '$flavorID'+g" ${!nt}
            else
                echo "flavor: '$flavorID'">>$inputsFile
            fi
          else
                echo "Warning: $z is unset. - Ignoring it ..."
          fi

           z="NODE_TEMPLATE_${i}_DATACENTRED_OS"
           if [ "${!z}" ]; then
                imageID=${!z}
                #echo "$z is ${imageID}"
                imageInputCount=`grep "image:" ${!nt} | grep -c get_input`
                if [ $imageInputCount -eq 1 ]; then
                    #echo "Setting the image (os) to ${imageID} in ${!nt}"
                    imageInput=`grep "image:" ${!nt} | grep get_input | awk -F":" '{ print $3 }' | sed -e "s+[ }]++g"`
                    echo "${imageInput}: '$imageID'">>$inputsFile
                    sed -i -e "s+\(image:\)\(.*\)+\1 '$imageID'+g" ${!nt}
                else
                    echo "image: '$imageID'">>$inputsFile
                fi
           else
                echo "Warning: $z is unset. - Ignoring it ..."
           fi

           echo "xap_management_vm_sec_grp: 'mng_grp_$1'">>$inputsFile
           echo "xap_container_vm_sec_grp: 'cont_grp_$1'">>$inputsFile


           z="NODE_TEMPLATE_${i}_DATACENTRED_AGENT_USER"
           if [ "${!z}" ]; then
                agentUser=${!z}
                #echo "$z is ${agentUser}"
                agentUserInputCount=`grep "user:" ${!nt} | grep -c get_input`
                if [ $agentUserInputCount -eq 1 ]; then
                    #echo "Setting the agent ssh user to ${agentUser} in ${!nt}"
                    userInput=`grep "user:" ${!nt} | grep get_input | awk -F":" '{ print $3 }' | sed -e "s+[ }]++g"`
                    echo "${userInput}: '$agentUser'">>$inputsFile
                    sed -i -e "s+\(user:\)\(.*\)+\1 '$agentUser'+g" ${!nt}
                else
                    echo "agent_user: '$agentUser'">>$inputsFile
                fi
           else
                echo "Warning: $z is unset. - Ignoring it ..."
           fi

           z="NODE_TEMPLATE_${i}_DATACENTRED_GSCS_PER_VM"
           if [ "${!z}" ]; then
                gscsPerVm=${!z}
                #echo "$z is ${gscsPerVm}"
                gscsPerVmInputCount=`grep "gsc_cnt:" ${!nt} | grep -c get_input`
                if [ $gscsPerVmInputCount -eq 1 ]; then
                    #echo "Setting the gsc_cnt to ${gscsPerVm} in ${!nt}"
                    userInput=`grep "gsc_cnt:" ${!nt} | grep get_input | awk -F":" '{ print $3 }' | sed -e "s+[ }]++g"`
                    echo "${userInput}: $gscsPerVm">>$inputsFile
                    sed -i -e "s+\(gsc_cnt:\)\(.*\)+\1 $gscsPerVm+g" ${!nt}
                else
                    echo "gsc_cnt: $gscsPerVm">>$inputsFile
                fi
           else
                echo "Warning: $z is unset. - Ignoring it ..."
           fi

           z="NODE_TEMPLATE_${i}_DATACENTRED_XAP_GSC_OPTIONS"
           if [ "${!z}" ]; then
                xapGscOptions=${!z}
                #echo "$z is ${xapGscOptions}"
                xapGscOptionsInputCount=`grep "GSC_JAVA_OPTIONS:" ${!nt} | grep -c get_input`
                if [ $xapGscOptionsInputCount -eq 1 ]; then
                    #echo "Setting the GSC_JAVA_OPTIONS to ${xapGscOptions} in ${!nt}"
                    userInput=`grep "GSC_JAVA_OPTIONS:" ${!nt} | grep get_input | awk -F":" '{ print $3 }' | sed -e "s+[ }]++g"`
                    echo "${userInput}: $xapGscOptions">>$inputsFile
                    sed -i -e "s+\(GSC_JAVA_OPTIONS:\)\(.*\)+\1 $xapGscOptions+g" ${!nt}
                else
                    echo "gsc_java_options: $xapGscOptions">>$inputsFile
                fi
           else
                echo "Warning: $z is unset. - Ignoring it ..."
           fi

           z="NODE_TEMPLATE_${i}_DATACENTRED_MORE_PROPS"
           if [ "${!z}" ]; then
                currentNodeInputs=${!z}
                #echo "$z is ${currentNodeInputs}"
                #echo "Adding additional inputs (${currentNodeInputs}) to ${!nt}"
                add_inputs $inputsFile $currentNodeInputs
           else
                echo "Warning: $z is unset. - Ignoring it ..."
           fi
        done
        set +e
        ;;
    esac


    popd
}


function create_deployment {
    echo "============================================================="
    if [ "${DEPLOY_APPLICATION}" == "false" ]; then
        echo "No need to run ${FUNCNAME[0]} ."
        return 0
    fi
    #pwd
    #echo "${FUNCNAME[0]}: execution id : $1"
    cfy deployments create -d $DEPLOYMENT_NAME -b $currBpName -i ${APPLICATION_NAME}/$1_inputs.yaml
    currStatus=$?
    if [ $currStatus -gt 0 ]; then
        echo "Failure in ${FUNCNAME[0]}"
        echo "- Aborting"
        exit
    fi
}


function pre_installation {
    echo "============================================================="
    if [ "${DEPLOY_APPLICATION}" == "false" ]; then
        echo "No need to run ${FUNCNAME[0]} ."
        return 0
    fi
    #echo "${FUNCNAME[0]}: execution id : $1"
}

function installation {
    echo "============================================================="
    if [ "${DEPLOY_APPLICATION}" == "false" ]; then
        echo "No need to run ${FUNCNAME[0]} ."
        return 0
    fi
    echo "${FUNCNAME[0]}: execution id : $1"
    cfy executions start -d $DEPLOYMENT_NAME -w install --timeout 1800
    currStatus=$?
    if [ $currStatus -gt 0 ]; then
        echo "Failure in ${FUNCNAME[0]}"
        echo "- Aborting"
        exit
    fi

    cfy deployments outputs -d $DEPLOYMENT_NAME
    cfy deployments outputs -d $DEPLOYMENT_NAME>deployment_output

    xap_mngr=`cat deployment_output | grep management_url | sed -e "s+\(.*\)\(management_url': u'\)\(http://.*:9099\)\(.*\)+\3+1"`
    xap_mngr_ip_address=`echo ${xap_mngr} | awk -F":" '{ print $2 }' | sed 's+//++g'`
    client_url=`cat deployment_output | grep client_url | sed -e "s+\(.*\)\(client_url': u'\)\(http://.*:8000\)\(.*\)+\3+1"`
    client_ip_address=`echo $client_url | awk -F":" '{ print $2 }' | sed 's+//++g'`
    private_key_prefix=private_key_${DEPLOYMENT_NAME}
    private_key_linux=private_key_${DEPLOYMENT_NAME}.pem
    private_key_windows=private_key_${DEPLOYMENT_NAME}.ppk

    if [ "${DEPLOY_DEFAULT_XAP_APPS}" == "true" ]; then
        pushd ~/.ssh/
        echo "wget ${client_url}/${private_key_linux}"
        wget ${client_url}/${private_key_linux}
        echo $?
        chmod 400 ${private_key_linux}
        popd
        echo "scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ~/.ssh/${private_key_linux} ~/geofeeder.jar ubuntu@${client_ip_address}:~/"
        scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ~/.ssh/${private_key_linux} ~/geofeeder.jar ubuntu@${client_ip_address}:~/
        echo "scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ~/.ssh/${private_key_linux} ~/geoweb.jar ubuntu@${client_ip_address}:~/"
        scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ~/.ssh/${private_key_linux} ~/geoweb.jar ubuntu@${client_ip_address}:~/

        cfy executions start -d $DEPLOYMENT_NAME  -w deploy_grid -p '{"grid_name": "datagrid", "schema": "partitioned", "partitions": 1, "backups": 0, "max_per_vm": 0, "max_per_machine": 0}'
        feederUrl=${client_url}/geofeeder.jar
        echo "feederUrl is ${feederUrl}"
        cfy executions start -d $DEPLOYMENT_NAME  -w deploy_pu -p "{\"pu_url\": \"${feederUrl}\", \"override_pu_name\": \"feeder\",\"schema\": \"partitioned\",\"partitions\": 1, \"backups\": 0, \"max_per_vm\": 0, \"max_per_machine\": 0}"
        geoWebUrl=${client_url}/geoweb.jar
        echo "geoWebUrl is ${geoWebUrl}"
        cfy executions start -d $DEPLOYMENT_NAME  -w deploy_pu -p "{\"pu_url\": \"${geoWebUrl}\", \"override_pu_name\": \"geoweb\",\"schema\": \"partitioned\",\"partitions\": 1, \"backups\": 0, \"max_per_vm\": 0, \"max_per_machine\": 0}"
    fi
    echo "*************************************************************"
    echo "   XAP Management URL is in ${xap_mngr}"
    echo "   Create a new space named benchmarkSpace"
    echo "   --------------------------------------"
    raw_str=`grep "AAA" deployment_output | awk -F"AAA" '{ print $2 }'`
    for i in ${raw_str//,/ }
    do
        echo "    $i" | sed 's/BBB//g' | sed 's/=/ is in /g'
    done
    echo "   --------------------------------------"
    echo "   If you have a Linux laptop: "
    echo "      Download the client VM's Private key from ${client_url}/${private_key_linux}"
    echo "      Then run : chmod 400 ${private_key_linux}"
    echo "      Connect to the client VM by running : ssh -i ${private_key_linux} ubuntu@${client_ip_address}"
    echo "      You can connect to the container VMs in the same way: "
    for i in ${raw_str//,/ }
    do
        container_ip=`echo "$i" | sed 's/BBB//g' | awk -F"=" '{print $2}'`
        echo "      ssh -i ${private_key_linux} ubuntu@${container_ip}"
    done
    echo "      You can connect to the XAP management VM in the same way: "
    echo "      ssh -i ${private_key_linux} ubuntu@${xap_mngr_ip_address}"
    echo "   --------------------------------------"
    echo "   If you have a Windows laptop: "
    echo "      Download the client VM's Private key from ${client_url}/${private_key_windows}"
    echo "      Connect to the client VM. E.g. : By using Putty and the private key."
    echo "   --------------------------------------"
    for i in ${raw_str//,/ }
    do
        container_ip=`echo "$i" | sed 's/BBB//g' | awk -F"=" '{print $2}'`
        geoweb_url="${container_ip}:8080/geoweb"
        echo "wget --spider ${geoweb_url} ... "
        wget --spider ${geoweb_url} >/dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "      You can access the geoweb application at ${geoweb_url}"
        fi
    done
    echo "   --------------------------------------"
    echo "   In ${client_ip_address} run the benchmark example or any other test ..."
    echo "   You can run the following command: "
    echo "      curl -s https://gist.githubusercontent.com/tamirko/692aa7728ecc72ac5dadad2c7ff34e82/raw/e549642ea804c1de566c78114c57062eb0411be8/runTheXapBenchmark.sh | bash /dev/stdin ${xap_mngr_ip_address}"
    echo "   Or run the following commands one by one: "
    echo "      export XAP_NIC_ADDRESS=${xap_mngr_ip_address}"
    echo "      export XAP_LOOKUP_LOCATORS=${xap_mngr_ip_address}"
    echo "      cd /tmp/xap/gigaspaces-xap-premium-11.0.0-ga/tools/benchmark/bin/"
    echo "      ./run.sh -clean -url jini://${xap_mngr_ip_address}:4174/benchmarkSpace_container1/benchmarkSpace"
    echo "   Then browse to ${xap_mngr}"
    echo "*************************************************************"
}

function post_installation {
    #echo "============================================================="
    if [ "${DEPLOY_APPLICATION}" == "false" ]; then
        echo "No need to run ${FUNCNAME[0]} ."
        return 0
    fi
    #echo "${FUNCNAME[0]}: execution id : $1"
}

mngrExists=`cfy --version |& grep -ic manager`

set_virtualenv ${executionID}
install_cfy ${executionID}
install_cfy_cloud_provider_plugin ${executionID}
pre_bootstrap ${executionID}
run_bootstrap ${executionID}
pre_blueprint_upload ${executionID}
blueprints_upload ${executionID}
pre_deployment_creation ${executionID}
populate_node_templates ${executionID}
create_deployment ${executionID}
pre_installation ${executionID}
installation ${executionID}
post_installation ${executionID}
#echo "============================================================="
#echo "Deactivating virtualenv '${current_venv_name}'"
deactivate
exit 0




sshKeyFile="/`whoami`/.ssh/${CFY_FOLDER}"

function replace_placeholders {
	# $1 is the file's full path
	#
	if [ "${CFY_MORE_PROPERTIES}" == "" ] || [ "${CFY_MORE_PROPERTIES}" == "undefined" ]; then
		echo "There are no additional properties"
		return 0
	fi

	#echo "Replacing place holders in $1 ..."
	#echo "CFY_MORE_PROPERTIES is ${CFY_MORE_PROPERTIES}"
	arr=$(echo $CFY_MORE_PROPERTIES | tr "," "\n")

	for x in ${arr[@]}
	do
		currkey=`echo $x | awk -F"=" '{print $1}'`
		currval=`echo $x | awk -F"=" '{print $2}'`
		#echo $currkey is $currval
		sed -i -e "s+$currkey+$currval+g" $1
	done

}


function install_app {
    #echo "In install_app using manager ${mngrIP} ..."
	#xxxx removelater
	#export CFY_APPNAME="drupalAndMemcached"
	export bp="${CFY_APPNAME}_${CFY_FOLDER}"
	export dep="${CFY_DEPLOYMENT}_${CFY_FOLDER}"
	export repoRootFolder="/root/cfyApps"
	origJsonFile="${repoRootFolder}/${CFY_APPNAME}/input.json"
	currInput="input.json"
	cp -f $origJsonFile $currInput
	sed -i -e "s+CFY_SLUSERNAME+$CFY_SLUSERNAME+g" $currInput
	sed -i -e "s+CFY_APIKEY+$CFY_APIKEY+g" $currInput
	sed -i -e "s+CFY_DATACENTER+$CFY_DATACENTER+g" $currInput
	sed -i -e "s+CFY_MEMORY+$CFY_MEMORY+g" $currInput
	sed -i -e "s+CFY_CPU+$CFY_CPU+g" $currInput
	sed -i -e "s+CFY_DISK+$CFY_DISK+g" $currInput
	sed -i -e "s+CFY_VMSOS+$CFY_VMSOS+g" $currInput
	sed -i -e "s+CFY_SSHKEYITEMID+$sshkeyItemID+g" $currInput
	sed -i -e "s+CFY_PORTSPEED+$CFY_PORTSPEED+g" $currInput
	replace_placeholders ${currInput}
	#echo "Uploading the blueprint ${repoRootFolder}/${CFY_APPNAME}/${CFY_BLUEPRINT} ..."
	dateA=$(date +"%s")
	cfy blueprints upload -p ${repoRootFolder}/${CFY_APPNAME}/${CFY_BLUEPRINT} -b $bp
	currStatus=$?
	if [ $currStatus -eq 0 ]; then
		dateB=$(date +"%s")
		diff=$(($dateB-$dateA))
		#echo "blueprints upload took $(($diff / 60)) minutes and $(($diff % 60)) seconds."
		#echo "Creating the deployment ${dep} ..."
		dateC=$(date +"%s")
		cfy deployments create -d $dep -b $bp -i $currInput
		currStatus=$?
		dateD=$(date +"%s")
		if [ $currStatus -eq 0 ]; then
			diff=$(($dateD-$dateC))
			#echo "Deployment creation took $(($diff / 60)) minutes and $(($diff % 60)) seconds."
			#if need to run apre-install (post deployment) script
			if [[ $CFY_MORE_PROPERTIES =~ .*CFY_VMS_QTY.* ]]; then
				#echo "About to update number of instances ... "
				currUpdatePy="update_instances.py"
				origUpdatePy="${repoRootFolder}/${CFY_APPNAME}/${currUpdatePy}"
				cp -f $origUpdatePy $currUpdatePy
				#echo "Replacing CFY_CURR_MANAGER and CFY_CURR_DEPLOYMENT with $mngrIP and $dep in $currUpdatePy"
				sed -i -e "s+CFY_CURR_MANAGER+$mngrIP+g" $currUpdatePy
				sed -i -e "s+CFY_CURR_DEPLOYMENT+$dep+g" $currUpdatePy
				replace_placeholders ${currUpdatePy}

				depCreated=0
				until [ $depCreated -gt 0 ]
				do
					export dateSleep=`date +%m/%d/%Y\ %H:%M:%S`
					echo "Waiting for ${dep} ${dateSleep}..."
					sleep 10s
					depCreated=`cfy executions list -d $dep | grep $dep | grep create | grep -c terminated`
				done

				echo "About to update number of instances by running ${currUpdatePy} ..."
				python $currUpdatePy
			fi
			#echo "Installing ${CFY_APPNAME} ..."
			dateE=$(date +"%s")
			cfy executions start -d $dep -w install --timeout 1800
			currStatus=$?
			dateF=$(date +"%s")
			if [ $currStatus -eq 0 ]; then
				diff=$(($dateF-$dateE))
				#echo "Installation took $(($diff / 60)) minutes and $(($diff % 60)) seconds."
				#echo "Displaying outputs of ${dep} ..."
				dateG=$(date +"%s")
				cfy deployments outputs -d $dep
				currStatus=$?
				dateH=$(date +"%s")
				if [ $currStatus -ne 0 ]; then
					echo "Failure in deployment outputs ... "
					echo -e "SoftLayer demo tool failed in deployment outputs - $date1\n *  Execution : ${CFY_FOLDER}\n * Attached is the log file\n\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool deployment outputs failure - $date1" ${CFY_EMAIL} -a ${currLog}
				else
					diff=$(($dateH-$dateG))
					echo "Deployments outputs took $(($diff / 60)) minutes and $(($diff % 60)) seconds."
				fi
			else
				echo "Failure in installation ... "
				echo -e "SoftLayer demo tool failed in installation of ${CFY_APPNAME} - $date1\n *  Execution : ${CFY_FOLDER}\n * Attached is the log file\n\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool installation failure - $date1" ${CFY_EMAIL} -a ${currLog}
			fi
		else
			echo "Failure in deployment creation ... "
			echo -e "SoftLayer demo tool failed in deployment creation - $date1\n *  Execution : ${CFY_FOLDER}\n * Attached is the log file\n\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool deployment creation failure - $date1" ${CFY_EMAIL} -a ${currLog}
		fi
	else
		echo "Failure in blueprints upload ... "
		echo -e "SoftLayer demo tool failed in blueprints upload - $date1\n *  Execution : ${CFY_FOLDER}\n * Attached is the log file\n\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool blueprint upload failure - $date1" ${CFY_EMAIL} -a ${currLog}
	fi
}


if [ $mngrExists -gt 0 ]; then
	#echo "Using the existing Cloudify manager..."
	mngrIP=`cfy --version |& grep -i manager | awk -F"=" '{print $2}' | sed 's/\]//g'`
	#echo "cfy use -t ${mngrIP} ....."
else
	if [ "${CFY_CFYMNGRIP}" == "" ] || [ "${CFY_CFYMNGRIP}" == "undefined" ]; then
	    cfy init -r
		if [ "${CFY_SSHKEYITEMID}" == "" ] || [ "${CFY_SSHKEYITEMID}" == "undefined" ]; then
			ssh-keygen -t rsa -C "${CFY_EMAIL}" -f "${sshKeyFile}" -q -N ""
			currSoftLayerConf=/`whoami`/${CFY_FOLDER}/${CFY_FOLDER}.conf
			cp ~/sotlayer_config.conf ${currSoftLayerConf}
			sed -i -e "s+REPLACE_WITH_USERNAME+$CFY_SLUSERNAME+g" ${currSoftLayerConf}
			sed -i -e "s+REPLACE_WITH_APIKEY+$CFY_APIKEY+g" ${currSoftLayerConf}
			slcli -C ${currSoftLayerConf} sshkey add ${CFY_FOLDER} -f ${sshKeyFile}.pub
			currStatus=$?
			if [ $currStatus -ne 0 ]; then
				echo "Sending email notification : failed in sshkey add"
				echo -e "SoftLayer demo tool failed in sshkey add command - $date1\n *  Execution : ${CFY_FOLDER}\n * Attached is the log file\n\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool slcli failure - $date1" ${CFY_EMAIL} -a ${currLog}
				success=0
			else
				echo "Invoking sshkey list... "
				sshkeyItemID=`slcli -C ${currSoftLayerConf} sshkey list | grep ${CFY_FOLDER} | awk -F" " '{print $1}'`
				itemIdKeyFile="/`whoami`/.ssh/${sshkeyItemID}"
				cp ${sshKeyFile} ${itemIdKeyFile}
				cp ${sshKeyFile}.pub ${itemIdKeyFile}.pub
			fi
		else
			itemIdKeyFile="/`whoami`/.ssh/${CFY_SSHKEYITEMID}"
			if [ ! -f "${itemIdKeyFile}" ]; then
				echo "Sending email notification : sshkey not found"
				echo -e "Sshkey item id ${CFY_SSHKEYITEMID} doesnt exist - $date1\n *  Execution : ${CFY_FOLDER}\n * Attached is the log file\n\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool sshkey not found - $date1" ${CFY_EMAIL} -a ${currLog}
				success=0
			else
				sshkeyItemID=${CFY_SSHKEYITEMID}
				sshKeyFile=${itemIdKeyFile}
				echo "Using existing ssh key"
			fi
		fi

		if [ $success -eq 1 ]; then
			echo "Bootstrapping a new Cloudify manager..."
			currInput="${CFY_FOLDER}.json"
			cp ~/inputs.json $currInput
			sed -i -e "s+CFY_SLUSERNAME+$CFY_SLUSERNAME+g" $currInput
			sed -i -e "s+CFY_APIKEY+$CFY_APIKEY+g" $currInput
			sed -i -e "s+CFY_DATACENTER+$CFY_DATACENTER+g" $currInput
			sed -i -e "s+CFY_MEMORY+$CFY_MEMORY+g" $currInput
			sed -i -e "s+CFY_CPU+$CFY_CPU+g" $currInput
			sed -i -e "s+CFY_DISK+$CFY_DISK+g" $currInput
			sed -i -e "s+CFY_OS+$CFY_OS+g" $currInput
			sed -i -e "s+CFY_SSHKEYITEMID+$sshkeyItemID+g" $currInput
			sed -i -e "s+CFY_SSHKEY_PATH+$sshKeyFile+g" $currInput
			sed -i -e "s+CFY_PORTSPEED+$CFY_PORTSPEED+g" $currInput
			#cat $currInput
			dateA=$(date +"%s")
			cfy bootstrap --install-plugins -p /root/cloudify-manager-blueprints/softlayer/softlayer-manager-blueprint.yaml -i $currInput --task-retries 100 --task-retry-interval 30
			currStatus=$?
			dateB=$(date +"%s")
			if [ $currStatus -eq 0 ]; then
				mngrExists=`cfy --version |& grep -ic manager`
				if [ $mngrExists -gt 0 ]; then
					diff=$(($dateB-$dateA))
					echo "Bootstrapping took $(($diff / 60)) minutes and $(($diff % 60)) seconds."
					cfy --version
					export mngrIP=`cfy --version |& grep -i manager | awk -F"=" '{print $2}' | sed 's/\]//g'`
					echo "The Cloudify manager's IP address is ${mngrIP}"
					echo "Execution : ${CFY_FOLDER}"
					echo "http://${mngrIP}"
					install_app
				else
					echo "Sending email notification : failed in bootstrap ..."
					echo -e "SoftLayer demo tool failed in bootstrap - $date1\n *  Execution : ${CFY_FOLDER}\n * Attached is the log file\n\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool bootstrap failure - $date1" ${CFY_EMAIL} -a ${currLog}
					success=0
				fi
			else
				echo "Aborting: Failure during bootstrap"
				echo -e "SoftLayer demo tool failed in bootstrap - $date1\n *  Execution : ${CFY_FOLDER}\n * Attached is the log file\n\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool bootstrap failure - $date1" ${CFY_EMAIL} -a ${currLog}
				success=0
			fi
		fi
	else
		echo "Using the existing Cloudify manager ${CFY_CFYMNGRIP}..."
		cfy use -t ${CFY_CFYMNGRIP}
		mngrStatus=$?
		if [ $mngrStatus -gt 0 ]; then
			echo "Error:"
			echo "***   Failed connecting to ${CFY_CFYMNGRIP}"
			echo "***   There is no Cloudify manager on ${CFY_CFYMNGRIP} (or a network error)."
			echo -e "SoftLayer demo tool failed connecting to the manager ${CFY_CFYMNGRIP} - $date1\n *  Execution : ${CFY_FOLDER}\n * Attached is the log file\n\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool connection failure - $date1" ${CFY_EMAIL} -a ${currLog}
			success=0
		else
			echo "${CFY_CFYMNGRIP} is a valid Cloudify manager"
			export mngrIP=${CFY_CFYMNGRIP}
			install_app
		fi
	fi
fi

if [ $success -eq 1 ]; then
	if [ "${CFY_CFYMNGRIP}" == "" ] || [ "${CFY_CFYMNGRIP}" == "undefined" ]; then
		echo -e "SoftLayer demo tool status\n *  Invoked: $date1\n *  Execution : ${CFY_FOLDER}\n *  You have a running Cloudify manager in ${mngrIP}\n *  SSH key (SL) item : ${sshkeyItemID}\n *  Attached are your private and public keys.\n\n Good luck !!!\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool - ${CFY_FOLDER}- $date1" ${CFY_EMAIL} -a ${sshKeyFile} -a ${sshKeyFile}.pub
	else
		echo -e "SoftLayer demo tool status\n *  Invoked: $date1\n *  Execution : ${CFY_FOLDER}\n *  You used an existing Cloudify manager in ${mngrIP}\n\n Good luck !!!\nhttp://www.SoftLayer.com\nhttps://control.softlayer.com" | mutt -s "SoftLayer demo tool - ${CFY_FOLDER}- $date1" ${CFY_EMAIL}
	fi
fi
echo "The end"
echo "-------------------------------"
popd
