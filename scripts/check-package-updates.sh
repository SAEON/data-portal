#!/bin/bash

# Repository top level
ncu

# @saeon packages
for directory in src/@saeon/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run check-package-updates"
  eval ${CMD}
done

# docs
npm --prefix src/docs run check-package-updates

# reporting
npm --prefix src/reporting run check-package-updates