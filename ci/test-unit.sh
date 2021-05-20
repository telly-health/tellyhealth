#!/usr/bin/env bash

# fail on first error
set -o errexit
set -o nounset
set -o pipefail

package_name="$1"

nohup yarn workspace core-api 

lerna exec yarn test:unit --scope "${package_name}"