#!/bin/bash
git add .
git commit -m "Committing current changes prior to major version update of NPM package"
git checkout master
git push
npm version major -m "Increment package.json version (major)"