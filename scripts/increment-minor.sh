#!/bin/bash
git add .
git commit -m "Committing current changes prior to minor version update of NPM package" --no-verify
npm version minor -m "Increment package.json version (minor)"
git add .
git commit -m "Bumped minor" --no-verify
git push