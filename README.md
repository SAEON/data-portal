![next](https://github.com/SAEON/catalogue/workflows/deployment@next/badge.svg?branch=next)
![stable](https://github.com/SAEON/catalogue/workflows/deployment@stable/badge.svg?branch=stable)

# SAEON Catalogue software

A suite of services that provide a platform for searching and exploring SAEON-curated datasets. The tech stack is as listed below. This document shows how to setup a development environment for contributions, and also explains how to build and deploy the services.

## The stack

- Docker
- Postgres + PostGIS
- GDAL (Docker image)
- GraphQL API (Node.js + [Koa.js](https://koajs.com/) + [Apollo Server](https://www.apollographql.com/docs/apollo-server/))
- Proxy API (Node.js + [AnyProxy](http://anyproxy.io/))
- Browser clients ([React.js](https://reactjs.org/) + [Material UI](https://material-ui.com/) + [Apollo client](https://www.apollographql.com/apollo-client))

## 3rd party service requirements

- Docker
- MongoDB
- Elasticsearch & Kibana (external)

## Gotchas

- The Node.js API must have access to the Docker CLI to run GDAL commands. Since the API is deployed as a Docker container, this means that the host's Docker engine and CLI should be mounted into the API Docker container (refer to [docker-compose.yml](deployments/stable/docker-compose.yml))

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
- [API configuration](#api-configuration)
- [Deployment and installation](#deployment-and-installation)
  - [Docker Stack](#docker-stack)
  - [SAEON Data Portal endpoints](#saeon-data-portal-endpoints)
    - [catalogue.saeon.dvn (`next` branch)](#cataloguesaeondvn-next-branch)
    - [catalogue.saeon.ac.za (`stable` branch)](#cataloguesaeonacza-stable-branch)
- [Documentation](#documentation)
  - [API](#api)
  - [Proxy](#proxy)
  - [Clients](#clients)
  - [Server configuration](#server-configuration)
  - [NPM packages](#npm-packages)
  - [Updating Diagrams](#updating-diagrams)
  - [Repository tools](#repository-tools)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

In summary, this software facilitates:

- Searching metadata records
- Previewing WMS maps when metadata records support this
- Exploring shapefile datasets linked to by the metadata records

### User/client scenarios

The platform is primarily driven by user interactions with the React.js UI application. This sequence diagram shows all the user/client scenarios for the basic search / preview / download functionality:

![Search sequence scenario](/diagrams/dist/client-scenarios.png)

# Quick start

Setup the repository for development on a local machine. The Node.js and React services are run using a local installation of Node.js, and dependent services (Mongo, Elasticsearch, PostGIS, GDAL) are run via Docker containers

## System requirements

1. Docker Engine
2. Node.js **node:17.7.1**

```sh
# Make sure that Node.js v17.7.2 is installed. Follow the instructions at https://github.com/nodesource/distributions/blob/master/README.md#debinstall
# Assuming an Ubuntu Linux environment
curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
sudo apt-get install gcc g++ make # Required for building node-sass and other modules with native bindings
sudo apt-get install -y nodejs
```

## Install source code and dependencies

```sh
# Download the source code
git clone git@github.com:SAEON/catalogue.git catalogue
cd catalogue

# Update repository git configuration
npm run configure-git

# Install package dependencies (this might take several minutes on the first run)
npm run install-dependencies

# Build local packages
npm run build-all-packages
```

## Local development

The catalogue software comprises three services, and is dependent on additional 3rd party services. These services all need to be started (order is important). **_The first time you start the catalogue services you need to be on the SAEON VPN_** - Elasticsearch is configured automatically and populated with data made available via the the SAEON Open Data Platform (ODP). After the first start you don't need to be connected to the VPN when developing on your local machine.

Mostly configuration params have sensible defaults, only the API needs to be explicitly [configured](/src/api#environment-configuration). This is because the integration with SAEON's ODP (Open Data Platform) requires authentication, without which there will be no data available to the catalogue software.

```sh
# Create a Docker network (required on local since GDAL is run Dockerized)
docker network create --driver bridge sdp_local_dev

# Start a MongoDB server
docker run --net=sdp_local_dev --name mongo --memory 1.5g --cpus 2 --restart always -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -v /home/$USER/mongo:/data/db -d -p 27017:27017 mongo:5.0.6

# Start a PostGIS server
docker run --name postgis --memory 1g --cpus 4  -v /home/$USER/pg_mnt:/var/lib/pg_mnt --net=sdp_local_dev -p 5432:5432 --restart always -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=sdp_local_dev -d ghcr.io/saeon/postgis:14

# Optionally start the pgAdmin IDE (on localhost:5001). I prefer DBeaver
# NOTE the postgis host that you want to connect to is just "postgis", since you are using the Docker network
docker run --net=sdp_local_dev --name pgadmin -p 5001:80 -e PGADMIN_DEFAULT_EMAIL=<your email address> -e PGADMIN_DEFAULT_PASSWORD=password -d dpage/pgadmin4

# Start an Elasticsearch server (you can connect to Elasticsearch.saeon.dvn instead if you want. Refer to the API service documentation)
docker run --net=sdp_local_dev --name elasticsearch --memory 1.5g --cpus 1.5 --restart always -e xpack.license.self_generated.type=basic -e xpack.security.enabled=false -e discovery.type=single-node -d -p 9200:9200 -p 9300:9300 docker.elastic.co/elasticsearch/elasticsearch:7.14.1

# Start a Kibana service (this is helpful if you are working on Elasticsearch configuration, but isn't required)
docker run --net=sdp_local_dev --name kibana --memory 256m --cpus 2 -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 -d -p 5601:5601 docker.elastic.co/kibana/kibana:7.14.1

# Start the Node.js proxy server
npm run proxy

# Start the Node.js API server
npm run api

# Start the React.js clients
npm run clients
```

Then [configure the API for first use](#api-configuration)

### Endpoints

- http://localhost:3001
- http://localhost:3000
- http://localhost:3000/graphql (public API)
- http://localhost:4000/graphql (internal API)
- http://localhost:8001 (proxy)
- http://localhost:8002 (proxy logs)
- http://localhost:9200
- http://localhost:5601
- postgis://localhost:5432
- mongodb://localhost:27017

# API configuration

The API is configured via HTTP using GraphQL mutations. Run the following mutations to configure a running instance of the API. **NOTE: There are actually TWO GraphQL APIs - one is for internal use and should NOT be exposed outside a private network. Use the internal HTTP service to configure the API**.

Navigate to GraphQL Playground (`<api-address>:4000/graphql`) where you can interact with the API (or whatever port you have configured for deployment)

```graphql
# Configure default PostGIS tables (TODO - remove)
mutation {
  configureDefaultPostGISLayers
}

# Integrate ODP data into the Elasticsearch index. This mutation can be run whenever there are new documents to integrate
mutation {
  configureElasticsearchIndex
}
```

# Deployment and installation

## Docker Stack

TODO

## SAEON Data Portal endpoints

### catalogue.saeon.dvn (`next` branch)

- https://catalogue.saeon.dvn
- https://api.catalogue.saeon.dvn
- https://api.catalogue.saeon.dvn/graphql (public API)
- http://api.catalogue.saeon.dvn:5002/graphql (internal API)
- https://proxy.saeon.dvn
- http://catalogue.saeon.dvn:8002 (for proxy logs)
- postgis://catalogue.saeon.dvn:5442
- mongodb://catalogue.saeon.dvn:27017

### catalogue.saeon.ac.za (`stable` branch)

- https://catalogue.saeon.ac.za
- https://api.catalogue.saeon.ac.za
- https://api.catalogue.saeon.ac.za/graphql (public API)
- http://api.catalogue.saeon.int:5002/graphql (internal API)
- https://proxy.saeon.ac.za
- http://catalogue.saeon.int:8002 (for proxy logs)
- postgis://catalogue.saeon.int:5442
- mongodb://catalogue.saeon.int:27017

# Documentation

## API

[src/api/README.md](src/api/)

## Proxy

[src/proxy/README.md](src/proxy/)

## Clients

[src/clients/README.md](src/clients/)

## Server configuration

[platform/README.md](platform/)

## NPM packages

[src/packages/README.md](src/packages/)

## Updating Diagrams

[diagrams/README.md](diagrams/)

## Repository tools

[src/tools/README.md](src/tools/)
