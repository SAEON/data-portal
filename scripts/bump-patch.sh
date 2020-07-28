#!/bin/bash
npm --prefix src/services/api version patch -m "on-commit patch"
npm --prefix src/services/client version patch -m "on-commit patch"