#!/bin/bash
git add .
git commit -m "Committing current changes prior to minor version update"
npm version minor -m "Increment package.json version (minor)"