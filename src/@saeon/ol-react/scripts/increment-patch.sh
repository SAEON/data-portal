#!/bin/bash
git add .
git commit -m "Committing current changes prior to patch version update of NPM package"
git push
npm version patch -m "Increment package.json version (patch)"