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
- [Command Line Interface (CLI)](#command-line-interface-cli)
  - [Running the CLI in a dockerized environment](#running-the-cli-in-a-dockerized-environment)
  - [Running the CLI in a local/non-dockerized environment](#running-the-cli-in-a-localnon-dockerized-environment)
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

The SAEON Data Portal is a tool for searching SAEON's curated metadata.

## The stack

- [Elasticsearch](https://www.elastic.co/)
- [MongoDB](https://www.mongodb.com/)
- GraphQL API (Node.js + [Koa.js](https://koajs.com/) + [Apollo Server](https://www.apollographql.com/docs/apollo-server/))
- Browser clients ([React.js](https://reactjs.org/) + [Material UI](https://mui.com//) + [Apollo client](https://www.apollographql.com/apollo-client))

# Quick start

Setup the repository for development on a local machine. The Node.js and React services are run using a local installation of Node.js, and dependent services (Mongo, Elasticsearch) are run via Docker containers.

Mostly configuration params have sensible defaults, only the API needs to be explicitly [configured](/src/api#environment-configuration) with authentication credentials, without which there will be no data available to the catalogue software (the server crashes on startup with a helpful error message in this case).

## System requirements

1. Docker Engine
2. Node.js **v19.5.0**

## [Start a local MongoDB server](https://github.com/SAEON/mongo#local-development)

## [Start the ELK stack locally](https://github.com/SAEON/elk-stack#local-development)

## Install dependencies and run the services

```sh
# Download the source code
git clone git@github.com:SAEON/data-portal.git sdp
cd sdp

# Install the chomp CLI
npm install -g chomp

# Update repository git configuration
chomp git:configure

# Install package dependencies. From the root of this repository:
npm install \
  && cd api \
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

The first time you use the Data Portal on a local you need to load metadata from the catalogue into Elasticsearch. There is a CLI to do this (refer to the section below on the CLI).

Here's the TLDR: from the root of this repository:

```sh
cd api
source env.sh
sdp integrations saeon --run
```

**_NOTE_**: if you are integrating against the development version of the ODP, then you need to allow for self-signed certificates (`NODE_TLS_REJECT_UNAUTHORIZED=0`). In this case the command is:

```sh
NODE_TLS_REJECT_UNAUTHORIZED=0 sdp integrations saeon --run
```

# Command Line Interface (CLI)

The application includes a CLI to run tasks - for example, triggering the ODP integration manually, building sitemaps manually, running database migration scripts, etc.

## Running the CLI in a dockerized environment

The CLI is packaged into the Docker image at build time. Use the `sdp` command in the context of the docker container. Even if the container is part of a docker stack, it's necessary to use a specific container on a specific host, so these instructions are for docker swarm or otherwise. For example:

```sh
# List active containers
docker container ls

# Get the container ID. For example: 0419726a1bec, and login to the container
docker container exec -it 0419726a1bec sh

# Run the CLI - the commands are documented in the CLI output
sdp
```

## Running the CLI in a local/non-dockerized environment

From the root of the source code repository:

```sh
cd api

# This updates the $PATH environment variable so that the `sdp` command works
source env.sh

# Run the CLI
sdp
```

# Deployment

Although the client and API are treated as separate during development, when deploying the software the client **_must_** be served via the API server. SEO and other features are configured this way.

NOTE: Since the client is configured at image build time, deployments to separate hostnames require building separate Docker images.

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
    -e ODP_HOSTNAME=odp.saeon.ac.za \
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

NETWORK=... # Refer to above
```

SAEON production and development deployments are configured as [Docker stacks](/deploy/).

## Deploy from source code

To deploy from source code directly (i.e. without Dockerizing the application), follow these steps.

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
source env.sh
start
```

# [API documentation](api/)

# [CLient documentation](clients/)
