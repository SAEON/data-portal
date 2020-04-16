#!/bin/bash

# Collect args

while getopts "p:s:" opt; do
  case $opt in
    p) PACKAGE=$OPTARG      ;;
    s) SEMVER=$OPTARG   ;;
    *) echo 'error' >&2
       exit 1
  esac
done

# Validate args
if [ ! $PACKAGE ]; then
    echo 'Option -p missing - please provide a package name' >&2
    exit 1
fi
if [ ! $SEMVER]; then
    echo 'Option -s missing - please provide a semver target' >&2
    exit 1
fi

# Update package version
case $SEMVER in
  patch)
    echo "Staging current changes. Bumping patch"
    git add .
    git commit -m "Staging current changes. Bumping patch" --no-verify
    npm version patch -m "Increment package.json version (patch)"
    git add .
    git commit -m "Bumped patch" --no-verify
    ;;

  minor)
    echo "Staging current changes. Bumping minor"
    git add .
    git commit -m "Staging current changes. Bumping patch" --no-verify
    npm version minor -m "Increment package.json version (minor)"
    git add .
    git commit -m "Bumped minor" --no-verify    
    ;;

  major)
    echo "Staging current changes. Bumping major"
    git add .
    git commit -m "Staging current changes. Bumping patch" --no-verify
    npm version major -m "Increment package.json version (major)"
    git add .
    git commit -m "Bumped major" --no-verify
    ;;
esac

# Publish to NPM
npm init --scope=@saeon
npm publish --access public

echo "Complete! See your package at https://npmjs.com/package/$PACKAGE"