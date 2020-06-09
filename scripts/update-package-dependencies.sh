#!/bin/bash

# Repository top level
ncu -u

# @saeon packages
for directory in src/@saeon/*;
  do D=$(readlink -f "$directory");
    CMD="npm --prefix $D run update-packages"
    eval ${CMD}
done

# docs
npm --prefix src/docs run update-packages

# reporting
npm --prefix src/reporting run update-packages

# Install package dependencies
npm run install-package-dependencies