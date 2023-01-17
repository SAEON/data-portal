![next](https://github.com/SAEON/catalogue/workflows/deployment@next/badge.svg?branch=next)
![stable](https://github.com/SAEON/catalogue/workflows/deployment@stable/badge.svg?branch=stable)

# SAEON Data Portal

A suite of services that provide a platform for searching and exploring SAEON-curated datasets

# README Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Overview](#overview)
  - [The stack](#the-stack)
- [Quick start](#quick-start)
  - [System requirements](#system-requirements)
  - [Start a local MongoDB server](#start-a-local-mongodb-server)
  - [Start the ELK stack locally](#start-the-elk-stack-locally)
  - [Install dependencies and run the services](#install-dependencies-and-run-the-services)
    - [Load catalogue data on first use](#load-catalogue-data-on-first-use)
- [Deployment](#deployment)
  - [Build and Deploy a Docker image](#build-and-deploy-a-docker-image)
    - [Build Docker image locally](#build-docker-image-locally)
    - [Run that image](#run-that-image)
    - [SAEON production/dev deployments](#saeon-productiondev-deployments)
  - [Deploy from source code](#deploy-from-source-code)
- [API documentation](#api-documentation)
- [CLient documentation](#client-documentation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview
Search SAEON's data catalogue, preview datasets on a map, and download data.

## The stack

- GraphQL API (Node.js + [Koa.js](https://koajs.com/) + [Apollo Server](https://www.apollographql.com/docs/apollo-server/))
- Browser clients ([React.js](https://reactjs.org/) + [Material UI](https://material-ui.com/) + [Apollo client](https://www.apollographql.com/apollo-client))

# Quick start

Setup the repository for development on a local machine. The Node.js and React services are run using a local installation of Node.js, and dependent services (Mongo, Elasticsearch) are run via Docker containers.

Mostly configuration params have sensible defaults, only the API needs to be explicitly [configured](/src/api#environment-configuration). This is because the integration with SAEON's ODP (Open Data Platform) requires authentication, without which there will be no data available to the catalogue software (the server crashes on startup with a helpful error message in this case).

## System requirements

1. Docker Engine
2. Node.js **v19**

## [Start a local MongoDB server](https://github.com/SAEON/mongo#local-development)

## [Start the ELK stack locally](https://github.com/SAEON/elk-stack#local-development)

## Install dependencies and run the services

```sh
# Download the source code
git clone git@github.com:SAEON/catalogue.git catalogue
cd catalogue

# Install the chomp CLI
npm install -g chomp

# Update repository git configuration
chomp configure-git

# Install package dependencies. From the root of this repository:
cd api \
  && npm install \
  && cd ../clients \
  && npm install \
  && cd ..

# Open a terminal window to run the API
cd api
chomp --watch

# Open a terminal window to run the clients
cd clients
chomp --watch
```

### Load catalogue data on first use
The first time you use the Data Portal on a local you need to load metadata from the catalogue into Elasticsearch. There is a CLI to do this - from the root of this repository:

```sh
cd api
source env.sh
sdp integrations saeon --run
```

# Deployment
Although the client and API are treated as separate during development, when deploying the software the client ***must*** be served via the API server. SEO and other features are configured this way.

## Build and Deploy a Docker image
Please refer to source code for build time & runtime configuration options (or request additional documentation). But in short, the domain of the image currently has to be specified at build time (when the React.js client is built via Webpack. Here is a minimum working example for deploying a Docker image on localhost.

### Build Docker image locally
From the root of the repository:

```sh
docker build -t sdp_local .
```

### Run that image

```sh
NETWORK=saeon_local

# Assuming containers named "mongo" and "elasticsearch" can be found on the "saeon_local" network

# Control what ODP records get included by mounting a js file at ODP_FILTER_PATH
# Control what filters are shown on the /records path by mounting a JSON file at CLIENT_FILTER_CONFIG_PATH

# Or if you want to test the image built above
IMAGE=sdp_local:latest

docker \
  run \
    -v $(pwd)/api/odp-filter.js:/app/odp-filter.js \
    -v $(pwd)/clients/client-filters.json:/app/client-filters.json \
    -e DEFAULT_SYSADMIN_EMAIL_ADDRESSES="..." \
    -e MONGO_DB_ADDRESS="mongodb://mongo:27017" \
    -e ELASTICSEARCH_ADDRESS="http://elasticsearch:9200" \
    -e ODP_ADDRESS=https://odp.saeon.ac.za \
    -e ODP_CLIENT_SECRET=... \
    -e ODP_SSO_CLIENT_SECRET=... \
    -e ODP_CLIENT_AUTH_SCOPES=ODP.Catalogue \
    -e ODP_FILTER_PATH=/app/odp-filter.js \
    -e CLIENT_FILTER_CONFIG_PATH=/app/client-filters.json \
    -p 3000:3000 \
    -d \
    --rm \
    --name sdp_local \
    --net=$NETWORK \
    $IMAGE
```


### SAEON production/dev deployments
Deploy the latest docker image configured for `catalogue.saeon.ac.za` using the same `docker run` command as above, but specify the correct Docker image:

```sh
IMAGE=ghcr.io/saeon/saeon-data-portal:latest
# or IMAGE=ghcr.io/saeon/sdp_next:dev

NETWORK=...
```

SAEON production and development deployments are configured as [Docker stacks](/deploy/).

## Deploy from source code
From the root of the repository:

```sh
chomp build
cd api

# Either start node via chomp
chomp

# Or run node directly
node \
  --no-warnings \
  --experimental-json-modules \
  src/index.js

# or start via the shell script
srouce env.sh
start
```

# [API documentation](api/)
# [CLient documentation](clients/)