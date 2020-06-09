#!/bin/bash

ncu -u
npm --prefix src/@saeon/anyproxy run update-packages
npm --prefix src/@saeon/atlas-api run update-packages
npm --prefix src/@saeon/atlas-client run update-packages
npm --prefix src/@saeon/catalogue-search run update-packages
npm --prefix src/@saeon/logger run update-packages
npm --prefix src/@saeon/ol-react run update-packages
npm --prefix src/@saeon/snap-menus run update-packages

scripts/install-package-dependencies.sh