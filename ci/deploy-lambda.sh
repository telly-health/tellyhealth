#!/usr/bin/env bash

# fail on first error
set -o errexit
set -o nounset
set -o pipefail

awsRegion=$1
awsAccountId=$2
image=$3
functionName=$4

aws lambda update-function-code --function-name ${functionName} --image-uri ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com/${image}:latest --publish