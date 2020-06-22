#!/bin/bash

# Repository top level
npm install

# packages
for directory in src/packages/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D install"
  eval ${CMD}
done

# services
for directory in src/services/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D install"
  eval ${CMD}
done