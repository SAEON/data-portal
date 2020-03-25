#!/bin/bash
git add .
git commit -m "Committing current changes prior to major version update of NPM package" --no-verify
npm version major -m "Increment package.json version (major)"
git add .
git commit -m "Bumped patch" --no-verify
git push