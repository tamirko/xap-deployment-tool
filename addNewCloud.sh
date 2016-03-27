#!/bin/bash

clear
currentClouds=`ls -1 app/views/ | grep -iEv "html|directives"`
if [ "$#" -lt 3 ]; then
    myCloud="mycloud"
    basedOnExample="openstack"
    myCloudDisplayName="My_Cloud"
    echo "======================================================================================"
    echo "Usage: $0 NEW_CLOUD_NAME BASED_ON_EXISTING_CLOUD NEW_CLOUD_DISPLAY_NAME"
    echo "E.g: "
    echo "   The following will create a new cloud named '${myCloud}'"
    echo "   which is based on ${basedOnExample} and whose display name is ${myCloudDisplayName}"
    echo "    $0 ${myCloud} ${basedOnExample} ${myCloudDisplayName}"
    echo "======================================================================================"
    echo "You can choose one of the following existing cloud providers:"
    echo "${currentClouds}"
    echo "--------------------------------------------------------------------------------------"
    exit 1
else
    requiredBasedOnCloudFound=false
    newCloudName=`echo $1 | tr [A-Z] [a-z] | sed 's/ /_/g'`
    newCloudCapitalName=`echo $1 | tr [a-z] [A-Z] | sed 's/ /_/g'`
    newCloudCapitalFirstLetter=${newCloudName^}
    requiredBasedOnCloudName=`echo $2 | tr [A-Z] [a-z]`
    requiredBasedOnCloudCapitalName=`echo $2 | tr [a-z] [A-Z]`
    basedOnCloudCapitalFirstLetter=${requiredBasedOnCloudName^}
    existingCloudsList=(${currentClouds})
    newCloudDisplayName=$3
    echo "About to create '${newCloudName}' which is based on '${requiredBasedOnCloudName}' ..."
    echo "The display name of the new cloud is '${newCloudDisplayName}'"
    for currentCloud in "${existingCloudsList[@]}"
    do
        if [ "${requiredBasedOnCloudName}" == "${currentCloud}" ]; then
            requiredBasedOnCloudFound=true
        fi

        if [ "${newCloudName}" == "${currentCloud}" ]; then
            echo "======================================================================================"
            echo "xxx Error:"
            echo "    '${newCloudName}' cloud already exists..."
            echo "    Please use a different cloud name"
            echo "Aborting"
            echo "======================================================================================"
            exit 1
        fi

        if [ "${newCloudDisplayName}" == "${currentCloud}" ]; then
            echo "======================================================================================"
            echo "xxx Error:"
            echo "    '${newCloudDisplayName}' already exists..."
            echo "    Please use a different display name"
            echo "Aborting"
            echo "======================================================================================"
            exit 1
        fi
    done

    displayNames=`grep "\": \"" app/translations/en.json | awk -F"\"" '{print $4}' | tr [A-Z] [a-z]`
    lowerCasedDisplayName=`echo ${newCloudDisplayName} | tr [A-Z] [a-z]`
    displayNamesList=(${displayNames})
    for currentDisplayName in "${displayNamesList[@]}"
    do
        if [ "${currentDisplayName}" == "${lowerCasedDisplayName}" ]; then
            echo "======================================================================================"
            echo "xxx Error:"
            echo "    '${newCloudDisplayName}' already exists as a display name..."
            echo "    Please use a new display name"
            echo "Aborting"
            echo "======================================================================================"
            exit 1
        fi
    done
fi

if [ ${requiredBasedOnCloudFound} == true ]; then
    echo "Searching for files of ${requiredBasedOnCloudName} ..."
else
    echo "======================================================================================"
    echo "xxx: Error:"
    echo "  ${requiredBasedOnCloudName} doesn't exist as a cloud provider"
    echo "  Please choose one of the following existing cloud providers:"
    echo "${currentClouds}"
    echo "======================================================================================"
    exit 1
fi


find . -iname "*${requiredBasedOnCloudName}*" | xargs -I file ls -d file | grep -v logo | while read currentFileOrDir; do
    if [ -d ${currentFileOrDir} ]; then
        echo "--------------------------------------------------------------------------------------"
        echo "$currentFileOrDir is a directory ..."
        dname=$(dirname $currentFileOrDir)
        echo " dir  name of this folder is ${dname}"
        echo " The files of this folder are: "
        ls -d -1 $currentFileOrDir/*
        echo "Creating a directory named ${dname}/${newCloudName} ..."
        mkdir -p ${dname}/${newCloudName}
        ls -d -1 $currentFileOrDir/* | xargs -I file cp -p file ${dname}/${newCloudName}/
        ls -d -1 ${dname}/${newCloudName}/* | xargs -I file sed -i -e "s+$requiredBasedOnCloudName+$newCloudName+g" file
        echo "--------------------------------------------------------------------------------------"
    else
        #echo "$currentFileOrDir is a file..."
        fname=$(basename $currentFileOrDir)
        dname=$(dirname $currentFileOrDir)
        #echo " base name is ${fname}"
        #echo " dir  name is ${dname}"
        # $basedOnCloudCapitalFirstLetter
        endFileName=`echo $currentFileOrDir | awk -F$basedOnCloudCapitalFirstLetter '{ print $2 }'`
        cp -p $currentFileOrDir $dname/$newCloudCapitalFirstLetter$endFileName
        sed -i -e "s/$basedOnCloudCapitalFirstLetter/$newCloudCapitalFirstLetter/g" $dname/$newCloudCapitalFirstLetter$endFileName
    fi
done
echo "--------------------------------------------------------------------------------------"
executejs=backend/services/execute.js
echo "Updating ${executejs} based on ${requiredBasedOnCloudName}..."
caseline=`grep -n "${requiredBasedOnCloudName}" $executejs | head -1 | cut -d: -f1`
executejsLines=`wc -l $executejs | cut -d' ' -f1`
breakLine=`sed -n ${caseline},${executejsLines}p $executejs | grep -n "break" | cut -d: -f1 | head -1`
endOfCase=$((caseline + breakLine - 1))
sed -n ${caseline},${endOfCase}p $executejs | sed -e "s+\(.*\)\($requiredBasedOnCloudName\)\(.*\)+\1$newCloudName\3+g" >xxx
yyy=`sed -n ${caseline},${endOfCase}p $executejs | sed -e "s+\(.*\)\($requiredBasedOnCloudName\)\(.*\)+\1$newCloudName\3+g"`
head -n ${endOfCase} $executejs>xxx
sed -n ${caseline},${endOfCase}p $executejs | sed -e "s+\(.*\)\($requiredBasedOnCloudName\)\(.*\)+\1$newCloudName\3+g">>xxx
endLine=`wc -l $executejs| cut -d' ' -f1`
fromEndOfCaseTOEnd=$((endLine - endOfCase))
tail -n ${fromEndOfCaseTOEnd} $executejs>>xxx
sed -i -e "s+\(.*\)\($requiredBasedOnCloudCapitalName\)\(.*\)\($newCloudName\)\(.*\)+\1$newCloudCapitalName\3\4\5+g" xxx
mv xxx ${executejs}
echo "--------------------------------------------------------------------------------------"
indexHTML=app/index.html
echo "Updating ${indexHTML}..."
sed -i -e "s+\(.*\)\($basedOnCloudCapitalFirstLetter\)\(.*\)+&\n\1$newCloudCapitalFirstLetter\3+g" $indexHTML
echo "--------------------------------------------------------------------------------------"
CloudProvidersService=app/scripts/services/CloudProvidersService.js
echo "Updating ${CloudProvidersService}..."
sed -i -e "s+\(.*\)\('id' : '$requiredBasedOnCloudName'\)\(.*\)+&\n            },{\n                'id' : '$newCloudName'+g" $CloudProvidersService
echo "--------------------------------------------------------------------------------------"
enJson=app/translations/en.json
echo "Updating ${enJson}..."
origPlaceHolder="\"azure\": \"Azure\""
newCloudDict="\"${newCloudName}\": \"${newCloudDisplayName}\""
sed -i -e "s/${origPlaceHolder}/&,\n        ${newCloudDict}/1" ${enJson}
basedOnCloudDisplayName=`grep $requiredBasedOnCloudName $enJson  | awk -F: '{print $2}' | sed -e 's/[", ]//g'`
lowerCasedBasedOnCloudDisplayName=`echo $basedOnCloudDisplayName | tr [A-Z] [a-z]`
echo "--------------------------------------------------------------------------------------"
cloudLoginDetails=app/views/directives/cloud_login_details.html
echo "Updating ${cloudLoginDetails}..."
countBaseOn=`grep -cE "(.*)($requiredBasedOnCloudName)(.*)" $cloudLoginDetails`
if [ $countBaseOn -gt 0 ]; then
    sed -e "s+\(.*\)\($requiredBasedOnCloudName\)\(.*\)+&\n\1$newCloudName\3+g" $cloudLoginDetails>xxx
else
    countBaseOnDisplay=`grep -cE "(.*)($lowerCasedBasedOnCloudDisplayName)(.*)" $cloudLoginDetails`
    if [ $countBaseOnDisplay -gt 0 ]; then
        sed -e "s+\(.*\)\($lowerCasedBasedOnCloudDisplayName\)\(.*\)+&\n\1$newCloudName\3+g" $cloudLoginDetails>xxx
    fi
fi
sed -i -e "s+\(.*\)\($newCloudName\)\(.*\)\($basedOnCloudDisplayName\)\(.*\)+\1\2\3$newCloudDisplayName\5+g" xxx
sed -i -e "s+\(.*\)\($requiredBasedOnCloudName\)\(.*\)\($newCloudName\)\(.*\)+\1$newCloudName\3\4\5+g" xxx
mv -f xxx ${cloudLoginDetails}
echo "--------------------------------------------------------------------------------------"
cloudLogo=app/images/winazure_logo.png
echo "Updating ${cloudLogo}..."
fname=$(basename $cloudLogo)
dname=$(dirname $cloudLogo)
newCloudLogo=`echo ${fname} | sed -e "s/${fname}/${newCloudName}_logo.png/g"`
cp -rp ${cloudLogo} ${dname}/${newCloudLogo}
echo "--------------------------------------------------------------------------------------"
baseLayout=app/styles/_base_layout.scss
echo "Creating a logo class for ${newCloudName} in ${baseLayout} based on ${requiredBasedOnCloudName}..."
logoline=`grep -n "${requiredBasedOnCloudName}-logo" $baseLayout | cut -d: -f1`
baseLayoutLines=`wc -l $baseLayout | cut -d' ' -f1`
curlyDelta=`sed -n ${logoline},${baseLayoutLines}p $baseLayout | grep -n "}" | cut -d: -f1 | head -1`
endOfLogoClass=$((logoline + curlyDelta - 1))
sed -n ${logoline},${endOfLogoClass}p $baseLayout | sed -e "s+\(.*\)\($requiredBasedOnCloudName\)\(.*\)+\1$newCloudName\3+g" >xxx
yyy=`sed -n ${logoline},${endOfLogoClass}p $baseLayout | sed -e "s+\(.*\)\($requiredBasedOnCloudName\)\(.*\)+\1$newCloudName\3+g"`
priorToLogo=$((logoline - 1))
head -n ${endOfLogoClass} $baseLayout>xxx
sed -n ${logoline},${endOfLogoClass}p $baseLayout | sed -e "s+\(.*\)\($requiredBasedOnCloudName\)\(.*\)+\1$newCloudName\3+g">>xxx
endLine=`wc -l $baseLayout| cut -d' ' -f1`
fromEndOfLogoTOEnd=$((endLine - endOfLogoClass))
tail -n ${fromEndOfLogoTOEnd} $baseLayout>>xxx
#diff xxx $baseLayout
mv xxx ${baseLayout}
echo " "
echo "End of $0"
echo "--------------------------------------------------------------------------------------"
exit
