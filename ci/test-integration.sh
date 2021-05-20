#!/usr/bin/env bash

# fail on first error
set -o errexit
set -o nounset
set -o pipefail

package_name="$1"
lerna exec yarn test:integration:ci --scope "${package_name}"