#!/bin/bash
git add .
git commit -m "Committing current changes prior to patch version update"
npm version patch -m "Increment package.json version (patch)"