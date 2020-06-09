#!/bin/bash

# Collect args
while getopts "s:" opt; do
  case $opt in
    s) SEMVER=$OPTARG   ;;
    *) echo 'error' >&2
       exit 1
  esac
done

# Validate args
if [ ! $SEMVER ]; then
    echo 'Option -s missing - please provide a semver target' >&2
    exit 1
fi

scripts/publish.sh -p @saeon/catalogue-search -s $SEMVER
scripts/publish.sh -p @saeon/logger -s $SEMVER
scripts/publish.sh -p @saeon/ol-react -s $SEMVER
scripts/publish.sh -p @saeon/snap-menus -s $SEMVER

# Update all packages
npm run update-package-dependencies