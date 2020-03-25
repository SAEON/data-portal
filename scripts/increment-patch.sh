#!/bin/bash
git add .
git commit -m "Committing current changes prior to patch version update of NPM package" --no-verify
npm version patch -m "Increment package.json version (patch)"
git add .
git commit -m "Bumped patch" --no-verify
git push