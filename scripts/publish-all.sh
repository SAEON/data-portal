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

# packages
for directory in src/packages/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run publish:$SEMVER"
  eval ${CMD}
done

# Update all packages
npm run update-package-dependencies