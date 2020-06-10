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

NPM_PACKAGES=(
    "src/@saeon/catalogue-search"
    "src/@saeon/logger"
    "src/@saeon/ol-react"
    "src/@saeon/snap-menus"
)

for PACKAGE in ${NPM_PACKAGES[*]}; do
    CMD="npm --prefix $PACKAGE run publish:$SEMVER"
    eval ${CMD}
done

# Update all packages
npm run update-package-dependencies