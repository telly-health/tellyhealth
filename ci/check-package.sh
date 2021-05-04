#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

source ./ci/setup.sh

pipeline_name=$1

echo "telly.health..."

# get all packages
get_all_packages() {
  lerna ls --json --parseable --all --loglevel silent
}

# Get a list of all changes on the branch.
changes_on_branch() {
  lerna ls --json --parseable --all --since refs/heads/master --loglevel silent
}

# Get a list of all packages that have changed between tagged releases
changes_on_tagged_release() {
  all_packages=$(get_all_packages)
  cat artifacts/"${GITHUB_REPOSITORY}-${GITHUB_REF/-branch/}.json" | jq --argjson all_packages "$all_packages" '[.packages[] as $package | $all_packages[] | select(.name == $package)]'
}

# Get list of all packages that have changed before last commit
changes_from_last_commit() {
  lerna ls --json --parseable --all --since HEAD^ --loglevel silent
}

get_changes() {
  if [[ "${GITHUB_REF}" == "refs/heads/master" ]] ; then
    # get packages from last commit
    changes_from_last_commit
  elif [[ "${GITHUB_REF}" =~ ^v[0-9]+\.[0-9]+ ]]; then
    # get packages from release artifacts
    changes_on_tagged_release
  else
    # get packages since last commit to master
    changes_on_branch
  fi
}

# A lerna change description for a project has these properties:
# * name  (this property is retrieved by this function)
# * version
# * location
get_package_name () {
  local data=$1
  echo "${data}" | jq -r ".name"
}

# A lerna change description for a project has these properties:
# * name
# * version
# * location (this property is retrieved by this function)
get_package_location () {
  local data=$1
  echo "${data}" | jq -r ".location"
}

# See https://starkandwayne.com/blog/bash-for-loop-over-json-array-using-jq/
# This converts each item in a json array to base64 using jq
json_arry_to_base64() {
  local input=$1
  echo "${input}" | jq -cr ".[] | @base64"
}

# See https://starkandwayne.com/blog/bash-for-loop-over-json-array-using-jq/
# This takes a base64 encoded item and decodes it (presumably to json in this case)
decode_base64() {
  local input=$1
  echo "${input}" | base64 --decode
}

# To be executed when a commit (or a number of commits) is pushed to a branch to start the
# CI/CD process. It performs these tasks in order:
# 1. retrieve a list of all changes since the last master (or version)
# 2. for each changed package, retrieve its name and location using some jq trickery described above
# 3. for each changed package, find the pipeline, replace interpolated variables and upload the pipeline
# using the buildkite agent.
# 4. Ingeneously, this will cause the uploaded pipelines to be run on each project.
main () {
  local changes
  local name
  local location
  local is_package_changed="false"

  changes=$(get_changes | jq -c ".")

  for package in $(json_arry_to_base64 "${changes}"); do
    name="$(get_package_name "$(decode_base64 "${package}")")"
    location="$(get_package_location "$(decode_base64 "${package}")")"
    log_info "The package ${name} at ${location} has changed. A build with run id ${GITHUB_RUN_ID} will triggered for the project."
    if [[ $pipeline_name == $name ]]; then
      is_package_changed="true"
    fi
  done

  if [[ $is_package_changed == "true" ]]; then
    log_info "The package ${pipeline_name} files has changed. Continue the pipeline."
    echo ::set-output name=conclusion::success
  else
    log_info "The package ${pipeline_name} files has not changed. Skip the pipeline."
    echo ::set-output name=conclusion::failure
  fi
}

main