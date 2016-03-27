#!/bin/bash

echo "----------------------------------------------------------"
export fname=$(basename $0)
echo "Running ${fname} ... "

echo "  Required CFY VERSION      : $CFY_VERSION"
echo "  CFY_MINOR_VERSION is      : ${CFY_MINOR_VERSION}"
echo "  PLUGINS_MINOR_VERSION is  : ${PLUGINS_MINOR_VERSION}"
echo "  CFY_GIT_TAG_BRANCH is     : ${CFY_GIT_TAG_BRANCH}"
echo "  PLUGINS_GIT_TAG_BRANCH is : ${PLUGINS_GIT_TAG_BRANCH}"
export CFY_VERSION_FOLDER=$CFY_MINOR_VERSION/$CFY_GIT_TAG_BRANCH

if [ -d $CFY_VERSION_FOLDER ]; then
    #cfy --version
    echo "Cloudify $CFY_MINOR_VERSION $CFY_GIT_TAG_BRANCH version already exists (`pwd`/${CFY_VERSION_FOLDER}). -Moving on."
    exit
fi
mkdir -p $CFY_VERSION_FOLDER
pushd $CFY_VERSION_FOLDER


if [ "${CFY_GIT_TAG_BRANCH}" == "ga" ]; then
    export cfy_tag=$CFY_MINOR_VERSION
    export cfy_plugin_tag=$PLUGINS_MINOR_VERSION
else
    export cfy_tag=${CFY_MINOR_VERSION}${CFY_GIT_TAG_BRANCH}
    echo cfy_tag $cfy_tag
    export cfy_plugin_tag=${PLUGINS_MINOR_VERSION}${PLUGINS_GIT_TAG_BRANCH}
    echo cfy_plugin_tag $cfy_plugin_tag
fi

gitRepos=(cloudify-dsl-parser cloudify-rest-client cloudify-plugins-common cloudify-script-plugin cloudify-fabric-plugin cloudify-cli cloudify-openstack-plugin cloudify-aws-plugin cloudify-azure-plugin cloudify-manager-blueprints cloudify-nodecellar-example)
for currGit in "${gitRepos[@]}"
do
    echo git clone https://github.com/cloudify-cosmo/$currGit.git
    git clone https://github.com/cloudify-cosmo/$currGit.git
    pushd $currGit/
    if [ "${currGit}" == "cloudify-script-plugin" ] || [ "${currGit}" == "cloudify-fabric-plugin" ] ; then
        git checkout tags/$cfy_plugin_tag
    else
        if [ "${currGit}" == "cloudify-aws-plugin" ]  || [ "${currGit}" == "cloudify-openstack-plugin" ] ; then
            git checkout tags/$cfy_plugin_tag
        else
            if [ "${currGit}" == "cloudify-azure-plugin" ] ; then
                echo "Until the GA release, we're using tag '331_ga_march_04_2016' for ${currGit}"
                git checkout tags/331_ga_march_04_2016
            else
                if [ "${currGit}" == "cloudify-nodecellar-example" ] ; then
                    echo "${currGit} doesn't need pip ..."
                fi
                git checkout tags/$cfy_tag
            fi
        fi
    fi

    if [ "${currGit}" != "cloudify-manager-blueprints" ] && [ "${currGit}" != "cloudify-nodecellar-example" ] ; then
        echo "pip installing ${currGit} (-e .)..."
        pip install -e .
    fi
    popd
done


# This is only for Azure
mkdir -p cloudify-manager-blueprints/components/manager/scripts/azure
cp cloudify-azure-plugin/new-manager-blueprint/components/manager/scripts/azure/configure.py cloudify-manager-blueprints/components/manager/scripts/azure/
cp cloudify-azure-plugin/new-manager-blueprint/azure-manager-blueprint*.yaml cloudify-manager-blueprints/

sed -i -e "s/\(.*\)\( subnet:\)/\1\2\n\1   dns_nameservers: [8.8.4.4, 8.8.8.8]/g" cloudify-manager-blueprints/openstack-manager-blueprint.yaml

pip list
cfy --version
popd
echo "End of ${fname}"
echo "----------------------------------------------------------"
exit

#https://gist.github.com/tamirko/d44cb4960ebae69eb9ca

#apt-get -y -q update
#apt-get install -y -q wget
#apt-get install -y -q curl
#apt-get install -y -q unzip

#apt-get install -y -q python-dev
#apt-get install -y -q python-virtualenv
#apt-get install -y -q git

virtualenv env
source env/bin/activate

cfy_tag=3.3.1
cfy_plugin_tag=1.3.1


done

