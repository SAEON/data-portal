#!/bin/bash

# Only bump patches if this is a commit to master
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" ]]; then
  echo 'bump-patch aborted - not on master branch';
  exit 0;
fi

npm --prefix src/services/api version patch -m "on-commit patch"
npm --prefix src/services/client version patch -m "on-commit patch"

# Not sure these should be bumped on commit
# npm --prefix src/@saeon/catalogue-search version patch -m "on-commit patch"
# npm --prefix src/@saeon/ol-react version patch -m "on-commit patch"