#!/bin/bash

cd ~/cloudify-deployment-tool
killall grunt
ps -ef | grep -E "node|grunt" | grep -v grep | awk -F" " '{print $2}' | xargs kill
grunt serve &
