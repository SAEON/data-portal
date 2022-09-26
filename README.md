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
  - [Install source code and dependencies](#install-source-code-and-dependencies)
  - [Start a local MongoDB server](#start-a-local-mongodb-server)
  - [Start the ELK stack locally](#start-the-elk-stack-locally)
    - [Local development](#local-development)
    - [Load catalogue data on first use](#load-catalogue-data-on-first-use)
- [Service documentation](#service-documentation)
  - [API](#api)
  - [Proxy](#proxy)
  - [Clients](#clients)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

In summary, this software facilitates:

- Searching metadata records
- Previewing WMS maps of datasets when metadata records support this
- Downloading resources linked to by the metadata records

## The stack

- GraphQL API (Node.js + [Koa.js](https://koajs.com/) + [Apollo Server](https://www.apollographql.com/docs/apollo-server/))
- Proxy API (Node.js + [AnyProxy](http://anyproxy.io/))
- Browser clients ([React.js](https://reactjs.org/) + [Material UI](https://material-ui.com/) + [Apollo client](https://www.apollographql.com/apollo-client))

# Quick start

Setup the repository for development on a local machine. The Node.js and React services are run using a local installation of Node.js, and dependent services (Mongo, Elasticsearch) are run via Docker containers

## System requirements

1. Docker Engine
2. Node.js **node:18.9.1** (NB! use exactly this version)

## Install source code and dependencies

```sh
# Download the source code
git clone git@github.com:SAEON/catalogue.git catalogue
cd catalogue

# Install the chomp CLI
npm install -g chomp

# Update repository git configuration
chomp configure-git

# Install package dependencies (this might take several minutes on the first run)
chomp install-dependencies

# Build local packages
chomp build-all-packages
```

## [Start a local MongoDB server](https://github.com/SAEON/mongo#local-development)

## [Start the ELK stack locally](https://github.com/SAEON/elk-stack#local-development)

### Local development
Mostly configuration params have sensible defaults, only the API needs to be explicitly [configured](/src/api#environment-configuration). This is because the integration with SAEON's ODP (Open Data Platform) requires authentication, without which there will be no data available to the catalogue software.

```sh
# Create a Docker network (if it doesn't already exist)
docker network create --driver bridge saeon_local

# Start the Node.js proxy server
chomp start:proxy

# Start the Node.js API server
chomp start:api

# Start the React.js clients
chomp start:clients
```

### Load catalogue data on first use
The first time you use the Data Portal on a local you need to load metadata from the catalogue into Elasticsearch. There is a CLI to do this - from the root of this repository:

```sh
cd src/api
source env.sh
sdp integrations saeon --run
```

# Service documentation

## API

[src/api/README.md](src/api/)

## Proxy

[src/proxy/README.md](src/proxy/)

## Clients

[src/clients/README.md](src/clients/)