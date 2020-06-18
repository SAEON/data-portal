#!/bin/bash

# Repository top level
ncu -u

# @saeon packages
for directory in src/@saeon/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run update-package-dependencies"
  eval ${CMD}
done

# docs
npm --prefix src/docs run update-package-dependencies

# reporting
npm --prefix src/reporting run update-package-dependencies

# Install package dependencies
npm run install-package-dependencies