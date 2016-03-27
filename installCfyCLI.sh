#!/bin/bash

cd ~/

apt-get -y -q update
apt-get install -y -q wget
apt-get install -y -q curl
apt-get install -y -q unzip

apt-get install -y -q python-dev
apt-get install -y -q python-virtualenv
apt-get install -y -q git

export virtualEnvName=myenv
export currVersion=3.2a8
virtualenv $virtualEnvName
source $virtualEnvName/bin/activate
pip install cloudify==3.2a8

git clone https://github.com/cloudify-cosmo/cloudify-manager-blueprints.git
pushd cloudify-manager-blueprints
git checkout tags/3.2m8
cd softlayer
cp inputs.yaml.template inputs.json
popd

pluginZip=slpluginm8.zip
pluginFolderName=cloudify-softlayer-plugin-1.2m8
pluginFolderPath=/root/${pluginFolderName}
pluginFullPath=${pluginFolderPath}/plugin.yaml
origPluginUrl=http://www.getcloudify.org/spec/softlayer-plugin/1.2m8/plugin.yaml
wget -O $pluginZip https://dl.dropboxusercontent.com/u/58809323/${pluginFolderName}.zip
unzip $pluginZip
rm $pluginZip

managerFolder=/root/cloudify-manager-blueprints/softlayer
managerBlueprint=${managerFolder}/softlayer-manager-blueprint.yaml
sed -i -e "s+$origPluginUrl+$pluginFullPath+g" $managerBlueprint 

origDocker=http://gigaspaces-repository-eu.s3.amazonaws.com/org/cloudify3/3.2.0/m8-RELEASE/cloudify-docker_3.2.0-m8-b178.tar
newDocker=http://gigaspaces-repository-eu.s3.amazonaws.com/org/cloudify3/3.2.0/m8-RELEASE/cloudify-docker-commercial_3.2.0-m8-b178.tar
sed -i -e "s+$origDocker+$newDocker+g" $managerBlueprint

# Add apt-get install -y -q curl
configureScript=${managerFolder}/scripts/configure.py

sed -i -e "s/from cloudify import ctx/&\nfrom fabric.api import run/g" $configureScript
installCurlCommand="    run('apt-get install -y -q curl')"
setProviderCtx="_set_provider_context(ssh_keys)"
sed -i -e "s/^\s*$setProviderCtx/&\n$installCurlCommand/" $configureScript

origPluginZipUrl=https://github.com/cloudify-cosmo/cloudify-softlayer-plugin/archive/1.2m8.zip
sed -i -e "s+$origPluginZipUrl+$pluginFolderPath+g" $pluginFullPath
