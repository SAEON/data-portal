<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [@saeon/proxy](#saeonproxy)
- [Quick start](#quick-start)
- [Deployment](#deployment)
      - [Install global repository packages](#install-global-repository-packages)
      - [Install local packages](#install-local-packages)
      - [Start the application](#start-the-application)
      - [Run as a Docker container](#run-as-a-docker-container)
      - [Check that the application is working!](#check-that-the-application-is-working)
- [Configuration](#configuration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# @saeon/proxy

This package runs an instance of the MIT-licensed `anyproxy` Node.js proxy server, with rules specific to the SAEON deployment. Depending on specific deployment environments, this package may or may not be required.

# Quick start

Make sure that Node.js ^14.4 is installed. From the root of the repository:

```sh
npm install
cd src/@saeon/proxy
npm install
npm start
```

# Deployment

#### Install global repository packages

```sh
npm ci --only=production
```

#### Install local packages

```sh
cd src/@saeon/proxy
npm ci --only=production
```

#### Start the application

```sh
cd src/@saeon/proxy
npm run start:prod
```

#### Run as a Docker container

```sh
cd . # From the root of the the repository
docker build -t proxy -f ./src/@saeon/proxy/Dockerfile .
docker run -p 8001:8001 -p 8002:8002 -d proxy
```

#### Check that the application is working!

- The proxy is available at http://localhost:8001
- A realtime UI is available at http://localhost:8002

# Configuration

Optionally create a `.env` file in the root of this package

```
cd src/@saeon/proxy
touch .env
```

This is a list of configuration options available (with default values indicated)

```sh
# Geneal
PORT=8001
ENABLE_WEB_INTERFACE=true
WEB_INTERFACE_PORT=8002
THROTTLE=10000

# SAEON specific
CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS=http://app01.saeon.ac.za
CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS2=http://196.21.191.55
SAEON_ELK_PROXY=http://192.168.115.66:9200
CATALOGUE_PROXY_CSIR_ESRI_ADDRESS=https://pta-gis-2-web1.csir.co.za/server2/rest/services
CATALOGUE_PROXY_HST_ESRI_PROXY=https://gisportal.saeon.ac.za/server/rest/services
```
