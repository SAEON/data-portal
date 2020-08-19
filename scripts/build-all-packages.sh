#!/bin/bash

for directory in src/packages/*; do
  P=$(readlink -f "$directory");
  CMD="npm --prefix $P run build"
  eval ${CMD}
done