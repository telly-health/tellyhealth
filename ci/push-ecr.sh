#!/usr/bin/env bash

# fail on first error
set -o errexit
set -o nounset
set -o pipefail

awsRegion=$1
awsAccountId=$2
image=$3

# login to AWS ECR
aws ecr get-login-password --region ${awsRegion} | docker login --username AWS --password-stdin ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com
# tag the docker image
docker tag ${image} ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com/${image}
# push the image to ECR
docker push ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com/${image}


