#!/bin/bash

# Repository top level
ncu -u

# packages
for directory in src/@saeon/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run update-package-dependencies"
  eval ${CMD}
done

# services
for directory in src/@saeon/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run update-package-dependencies"
  eval ${CMD}
done

# Install package dependencies
npm run install-package-dependencies