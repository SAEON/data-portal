#!/bin/bash

# Repository top level
ncu

# packages
for directory in src/packages/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run check-package-updates"
  eval ${CMD}
done

# services
for directory in src/services/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D run check-package-updates"
  eval ${CMD}
done