#! /bin/bash -x

export DEPLOYMENT_TOOL_ENVS_ROOT=~/deployment_tool_envs

outputFile=~/tmp/123
echo "$0 ..." >$outputFile

echo "MANAGER_IP : $MANAGER_IP">>$outputFile
echo "DELETE_DEPLOYMENTS : $DELETE_DEPLOYMENTS">>$outputFile
echo "DELETE_BLUEPRINTS : $DELETE_BLUEPRINTS">>$outputFile
echo "KILL_MANAGER : $KILL_MANAGER">>$outputFile

source $DEPLOYMENT_TOOL_ENVS_ROOT/cfy_3_3_1ga_env/bin/activate
mkdir -p ~/tmp/xxx
pushd ~/tmp/xxx
cfy -- version
cfy use -t $MANAGER_IP
cfy deployments list | grep -vE "created_at|--|Deployments:|$^" | awk -F\| '{print $2}' | sed -e "s/ //g" | xargs -I file cfy executions start -w uninstall -d file
echo "uninstall status: $?">>$outputFile

#cfy deployments list | grep -vE "created_at|--|Deployments:|$^" | awk -F\| '{print $2}' | sed -e "s/ //g" | xargs -I file echo "cfy deployments delete -d file"
cfy deployments list | grep -vE "created_at|--|Deployments:|$^" | awk -F\| '{print $2}' | sed -e "s/ //g" | xargs -I file cfy deployments delete -d file
echo "DELETE_DEPLOYMENTS status: $?">>$outputFile
cfy blueprints list | grep -vE "created_at|--|Blueprints:|$^" | awk -F\| '{print $2}' | sed -e "s/ //g" | xargs -I file cfy blueprints delete -b file
echo "DELETE_BLUEPRINTS status: $?">>$outputFile
deactivate
popd

echo "End of $0" >>$outputFile




