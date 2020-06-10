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

echo $PACKAGE
echo $SEMVER

# Validate args
if [ ! $PACKAGE ]; then
    echo 'Option -p missing - please provide a package name' >&2
    exit 1
fi
if [ ! $SEMVER ]; then
    echo 'Option -s missing - please provide a semver target' >&2
    exit 1
fi

# Update package version
echo "Staging current changes. Bumping $PACKAGE $SEMVER"
git add .
git commit -m "Staging current changes. Bumping $SEMVER ($PACKAGE)" --no-verify

case $SEMVER in
    patch)
        npm version patch -m "Increment package.json $SEMVER version ($PACKAGE)"
    ;;
    minor)
        npm version minor -m "Increment package.json $SEMVER version ($PACKAGE)"
    ;;
    major)
        npm version major -m "Increment package.json $SEMVER version ($PACKAGE)"
    ;;
esac

git add .
git commit -m "Bumped $PACKAGE $SEMVER" --no-verify

# Publish to NPM
npm init --scope=@saeon
npm publish --access public

echo "Complete! See your package at https://npmjs.com/package/$PACKAGE"