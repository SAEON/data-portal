#!/bin/bash

while getopts u:d:p:f: option
do
case "${option}"
in
p) PACKAGE=${OPTARG};;
esac
done

npm init --scope=@saeon
npm publish --access public

echo "Complete! See your package at https://npmjs.com/package/$PACKAGE"