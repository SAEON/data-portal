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
- [Service documentation](#service-documentation)
  - [API](#api)
  - [Clients](#clients)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview
Search SAEON's data catalogue, preview datasets on a map, and download data.

## The stack

- GraphQL API (Node.js + [Koa.js](https://koajs.com/) + [Apollo Server](https://www.apollographql.com/docs/apollo-server/))
- Browser clients ([React.js](https://reactjs.org/) + [Material UI](https://material-ui.com/) + [Apollo client](https://www.apollographql.com/apollo-client))

# Quick start

Setup the repository for development on a local machine. The Node.js and React services are run using a local installation of Node.js, and dependent services (Mongo, Elasticsearch) are run via Docker containers.

Mostly configuration params have sensible defaults, only the API needs to be explicitly [configured](/src/api#environment-configuration). This is because the integration with SAEON's ODP (Open Data Platform) requires authentication, without which there will be no data available to the catalogue software.

## System requirements

1. Docker Engine
2. Node.js **node:19.0.1** (NB! use exactly this version)

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
cd src/api \
  && npm install \
  && cd ../clients \
  && npm install \
  && cd ..

# Open a terminal window to run the API
cd src/api
chomp --watch

# Open a terminal window to run the clients
cd src/clients
chomp --watch
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

## Clients

[src/clients/README.md](src/clients/)