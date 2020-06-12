#!/bin/bash

# Repository top level
npm install

# @saeon packages
for directory in src/@saeon/*; do
  D=$(readlink -f "$directory");
  CMD="npm --prefix $D install"
  eval ${CMD}
done

# docs
npm --prefix src/docs install

# reporting
npm --prefix src/reporting install