#!/bin/bash
git add .
git commit -m "Committing current changes prior to minor version update of NPM package"
git push
npm version minor -m "Increment package.json version (minor)"