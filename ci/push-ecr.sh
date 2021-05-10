#!/usr/bin/env bash

# fail on first error
set -o errexit
set -o nounset
set -o pipefail

awsRegion=$1
awsAccountId=$2
localImage=$3
image=$4

# login to 
aws ecr get-login-password --region ${awsRegion} | docker login --username AWS --password-stdin ${awsAccountId}.dkr.ecr.region.amazonaws.com
docker tag ${localImage} ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com/${image}
docker push ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com/${image}