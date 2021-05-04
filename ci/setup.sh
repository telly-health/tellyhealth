#!/usr/bin/env bash

# fail on first error
set -o errexit
set -o nounset
set -o pipefail

#!/usr/bin/env bash
# A set of of common utility functions useful in scripts.

RED="\033[0;31m"
CYAN="\033[0;36m"
NO_COLOR="\033[0m"

log_err() {
  printf ${RED}"[ERROR: $(date +'%Y-%m-%dT%H:%M:%S%z')]: $@ \n"${NO_COLOR} >&2
}

log_info() {
  printf ${CYAN}"[INFO: $(date +'%Y-%m-%dT%H:%M:%S%z')]: $@ \n"${NO_COLOR} >&1
}

export FORCE_COLOR=1
