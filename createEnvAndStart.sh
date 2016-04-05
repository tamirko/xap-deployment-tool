#!/bin/bash

sudo apt-get install -y npm
sudo apt-get install -y git
sudo apt-get install -y unzip
sudo apt-get install -y gcc
sudo apt-get install -y python-pip
sudo apt-get install -y python-virtualenv
sudo apt-get install -y python-dev
sudo pip install --upgrade pip
sudo pip install --upgrade virtualenv
sudo npm -g install grunt-cli bower
sudo apt-get install -y build-essential libssl-dev
curl https://raw.githubusercontent.com/creationix/nvm/v0.12.0/install.sh | sudo bash
source ~/.profile
sudo chown -R `whoami`:`whoami` ~/.nvm
nvm --version
nvm install
npm install -g grunt-cli
npm install -g bower
mkdir -p dev
mkdir -p backend/dev
~/deployment_tool_envs/
bower install
npm run clean_all


exit
In CFY 3.3.1
ssh to the manager and
sudo vi /opt/cloudify-ui/views/cosmoLayoutTemplate.html
replace the 1st line with the followi3ng :



killall grunt
ps -ef | grep -E "node|grunt" | grep -v grep | awk -F" " '{print $2}' | xargs kill

# in .nvmrc you should have 0.10.35
export NVM_VER=`cat .nvmrc`
export NVM_DIR="/home/`whoami`/.nvm"
export NVM_VER_PATH="/home/`whoami`/.nvm/v${NVM_VER}"
export NVM_BIN="${NVM_VER_PATH}/bin"
export NVM_PATH="${NVM_VER_PATH}/lib/node"
export PATH="${NVM_BIN}:/u"
#nvm install
#npm install -g grunt-cli
#npm install -g bower
#bower install
npm run clean_all
grunt serve
