#!/bin/bash

# Only bump patches if this is a commit to next
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "next" ]]; then
  echo 'bump-patch aborted - not on "next" branch';
  exit 0;
fi

npm --prefix src/services/api version patch -m "on-commit patch"
npm --prefix src/services/client version patch -m "on-commit patch"