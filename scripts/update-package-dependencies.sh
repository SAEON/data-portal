#!/bin/bash

# Repository top level
ncu -u

# packages
for directory in src/packages/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run update-package-dependencies"
  echo $CMD
  eval ${CMD}
done

# generators
for directory in src/generators/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run update-package-dependencies"
  echo $CMD
  eval ${CMD}
done

# services
for directory in src/services/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run update-package-dependencies"
  eval ${CMD}
done

echo "Giving NPM a chance to reflect pushed packages..."
sleep 30

# Install package dependencies
npm run install-package-dependencies