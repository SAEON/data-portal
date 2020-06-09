#!/bin/bash

ncu
npm --prefix src/@saeon/anyproxy run check-package-updates
npm --prefix src/@saeon/atlas-api run check-package-updates
npm --prefix src/@saeon/atlas-client run check-package-updates
npm --prefix src/@saeon/catalogue-search run check-package-updates
npm --prefix src/@saeon/logger run check-package-updates
npm --prefix src/@saeon/ol-react run check-package-updates
npm --prefix src/@saeon/snap-menus run check-package-updates