![next](https://github.com/SAEON/catalogue/workflows/deployment@next/badge.svg?branch=next)
![stable](https://github.com/SAEON/catalogue/workflows/deployment@stable/badge.svg?branch=stable)

# SAEON Catalogue software

A suite of services that provide a platform for searching and exploring SAEON-curated datasets. The tech stack is as listed below. This document shows how to setup a development environment for contributions, and also explains how to build and deploy the services.

## The stack

- Docker
- GraphQL API (Node.js + [Koa.js](https://koajs.com/) + [Apollo Server](https://www.apollographql.com/docs/apollo-server/))
- Proxy API (Node.js + [AnyProxy](http://anyproxy.io/))
- Browser clients ([React.js](https://reactjs.org/) + [Material UI](https://material-ui.com/) + [Apollo client](https://www.apollographql.com/apollo-client))

## 3rd party service requirements

- Docker
- MongoDB
- Elasticsearch & Kibana (external)

# README Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Overview](#overview)
    - [User/client scenarios](#userclient-scenarios)
- [Quick start](#quick-start)
  - [System requirements](#system-requirements)
  - [Install source code and dependencies](#install-source-code-and-dependencies)
  - [Local development](#local-development)
    - [Endpoints](#endpoints)
- [Deployment and installation](#deployment-and-installation)
  - [Docker Stack](#docker-stack)
  - [SAEON Data Portal endpoints](#saeon-data-portal-endpoints)
    - [catalogue.saeon.dvn (`next` branch)](#cataloguesaeondvn-next-branch)
    - [catalogue.saeon.ac.za (`stable` branch)](#cataloguesaeonacza-stable-branch)
- [More documentation](#more-documentation)
  - [API](#api)
  - [Proxy](#proxy)
  - [Clients](#clients)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

In summary, this software facilitates:

- Searching metadata records
- Previewing WMS maps of datasets when metadata records support this
- Downloading resources linked to by the metadata records

### User/client scenarios

The platform is primarily driven by user interactions with the React.js UI application. This sequence diagram shows all the user/client scenarios for the basic search / preview / download functionality:

![Search sequence scenario](/diagrams/dist/client-scenarios.png)

# Quick start

Setup the repository for development on a local machine. The Node.js and React services are run using a local installation of Node.js, and dependent services (Mongo, Elasticsearch) are run via Docker containers

## System requirements

1. Docker Engine
2. Node.js **node:17.8.0**

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

## Local development
Mostly configuration params have sensible defaults, only the API needs to be explicitly [configured](/src/api#environment-configuration). This is because the integration with SAEON's ODP (Open Data Platform) requires authentication, without which there will be no data available to the catalogue software.

```sh
# Create a Docker network
docker network create --driver bridge sdp_local_dev

# Start a MongoDB server
docker run --net=sdp_local_dev --name mongo --memory 1.5g --cpus 2 --restart always -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -v /home/$USER/mongo:/data/db -d -p 27017:27017 mongo:5.0.6

# Start an Elasticsearch server (you can connect to Elasticsearch.saeon.dvn instead if you want. Refer to the API service documentation)
docker run --net=sdp_local_dev --name elasticsearch --memory 1.5g --cpus 1.5 --restart always -e xpack.license.self_generated.type=basic -e xpack.security.enabled=false -e discovery.type=single-node -d -p 9200:9200 -p 9300:9300 docker.elastic.co/elasticsearch/elasticsearch:8.1.2

# Start a Kibana service (this is helpful if you are working on Elasticsearch configuration, but isn't required)
docker run --net=sdp_local_dev --name kibana --memory 1024m --cpus 2 -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 -d -p 5601:5601 docker.elastic.co/kibana/kibana:8.1.2

# Start the Node.js proxy server
chomp start:proxy

# Start the Node.js API server
chomp start:api

# Start the React.js clients
chomp start:clients
```

Then [configure the API for first use](#api-configuration)

### Endpoints

- http://localhost:3001
- http://localhost:3000
- http://localhost:3000/graphql
- http://localhost:8001 (proxy)
- http://localhost:8002 (proxy logs)
- http://localhost:9200
- http://localhost:5601
- mongodb://localhost:27017

# Deployment and installation

## Docker Stack

TODO

## SAEON Data Portal endpoints

### catalogue.saeon.dvn (`next` branch)

- https://catalogue.saeon.dvn
- https://api.catalogue.saeon.dvn
- https://api.catalogue.saeon.dvn/graphql
- https://proxy.saeon.dvn
- http://catalogue.saeon.dvn:8002 (for proxy logs)
- mongodb://catalogue.saeon.dvn:27017

### catalogue.saeon.ac.za (`stable` branch)

- https://catalogue.saeon.ac.za
- https://api.catalogue.saeon.ac.za
- https://api.catalogue.saeon.ac.za/graphql
- https://proxy.saeon.ac.za
- http://catalogue.saeon.int:8002 (for proxy logs)
- mongodb://catalogue.saeon.int:27017

# More documentation

## API

[src/api/README.md](src/api/)

## Proxy

[src/proxy/README.md](src/proxy/)

## Clients

[src/clients/README.md](src/clients/)