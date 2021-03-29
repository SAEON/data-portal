![next](https://github.com/SAEON/catalogue/workflows/deployment@next/badge.svg?branch=next)
![stable](https://github.com/SAEON/catalogue/workflows/deployment@stable/badge.svg?branch=stable)

# SAEON Catalogue software

A suite of services that provide a platform for searching and exploring SAEON-curated datasets. The tech stack is as listed below. This document shows how to setup a development environment for contributions, and also explains how to build and deploy the services.

- Docker
- MongoDB
- Elasticsearch & Kibana
- Postgres + PostGIS
- GDAL (Docker image)
- GraphQL API (Node.js + [Koa.js](https://koajs.com/) + [Apollo Server](https://www.apollographql.com/docs/apollo-server/))
- Proxy API (Node.js + [AnyProxy](http://anyproxy.io/))
- Browser client ([React.js](https://reactjs.org/) + [Material UI](https://material-ui.com/) + [Apollo client](https://www.apollographql.com/apollo-client))

## Deployment view
![Topology of deployed platform](/diagrams/dist/deployment-view.png)


# README Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Quick start](#quick-start)
  - [System requirements](#system-requirements)
  - [Install source code and dependencies](#install-source-code-and-dependencies)
  - [Local development](#local-development)
    - [Endpoints](#endpoints)
- [API configuration](#api-configuration)
- [Deployment and installation](#deployment-and-installation)
  - [Docker-compose (quick deployment)](#docker-compose-quick-deployment)
  - [Containerized deployment](#containerized-deployment)
  - [Continuous deployment](#continuous-deployment)
  - [SAEON Data Portal endpoints](#saeon-data-portal-endpoints)
    - [catalogue.saeon.dvn (`next` branch)](#cataloguesaeondvn-next-branch)
    - [catalogue.saeon.ac.za (`stable` branch)](#cataloguesaeonacza-stable-branch)
- [Documentation](#documentation)
  - [API](#api)
  - [Proxy](#proxy)
  - [Client](#client)
  - [Server configuration](#server-configuration)
  - [NPM packages](#npm-packages)
  - [Updating Diagrams](#updating-diagrams)
  - [Repository tools](#repository-tools)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Quick start

Setup the repository for development on a local machine. The Node.js and React services are run using a local installation of Node.js, and dependent services (Mongo, Elasticsearch, PostGIS, GDAL) are run via Docker containers

## System requirements

1. Docker Desktop
2. Node.js **v15.11** (Versions lower than **v14.13** will not work)

```sh
# Make sure that Node.js ^14.15 is installed. Follow the instructions at https://github.com/nodesource/distributions/blob/master/README.md#debinstall
# Assuming an Ubuntu Linux environment
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
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

Mostly configuration params have sensible defaults, only the API needs to be explicitly [configured](/src/services/api#environment-configuration). This is because the integration with SAEON's ODP (Open Data Platform) requires authentication, without which there will be no data available to the catalogue software.

```sh
# Create a Docker network (required on local since GDAL is run Dockerized)
docker network create --driver bridge catalogue

# Start a MongoDB server
docker run --net=catalogue --name mongo --restart always -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -d -p 27017:27017 mongo:4.4.3

# Start a PostGIS server (from the /src/services/postgis directory)
docker build -t postgis .
docker run --name postgis -v /var/lib/catalogue-api:/var/lib/catalogue-api --net=catalogue -p 5432:5432 --restart always -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=databooks -d postgis

# Optionally start the pgAdmin IDE (on localhost:5001)
# NOTE the postgis container host that you want to connect to is just "postgis", since you are using the Docker network
docker run --net=catalogue --name pgadmin -p 5001:80 -e PGADMIN_DEFAULT_EMAIL=<your email address> -e PGADMIN_DEFAULT_PASSWORD=password -d dpage/pgadmin4

# Start an Elasticsearch server (you can connect to Elasticsearch.saeon.dvn instead if you want. Refer to the API service documentation)
docker run --net=catalogue --name elasticsearch --restart always -e xpack.license.self_generated.type=basic -e xpack.security.enabled=false -e discovery.type=single-node -d -p 9200:9200 -p 9300:9300 docker.elastic.co/elasticsearch/elasticsearch:7.10.2

# Start a Kibana service (this is helpful if you are working on Elasticsearch configuration, but isn't required)
docker run --net=catalogue --name kibana --restart always -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 -d -p 5601:5601 docker.elastic.co/kibana/kibana:7.10.2

# Start the Node.js proxy server
npm run start:proxy

# Start the Node.js API server
npm run start:api

# Start the React.js client
npm run start:client
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
# Configure default PostGIS tables
mutation {
  configureDefaultPostGISLayers
}

# Create an appropriate Elasticsearch index template. This mutation should only be run on initial app startup
mutation {
  configureElasticsearchTemplate
}

# Integrate ODP data into the Elasticsearch index. This mutation can be run whenever there are new documents to integrate
mutation {
  configureElasticsearchIndex
}
```

# Deployment and installation

## Docker-compose (quick deployment)

From the root of the source code directory run the following shell command to start the services:

```sh
CATALOGUE_API_ODP_CLIENT_SECRET="<secret>" \
MONGO_DB_USERNAME="<username>" \
MONGO_DB_PASSWORD="<password>" \
POSTGIS_USERNAME="<username>" \
POSTGIS_PASSWORD="<password>" \
CATALOGUE_LATEST_COMMIT= \
CATALOGUE_DEPLOYMENT_ENV="development" \
CATALOGUE_API_ADDRESS="http://localhost:3000" \
CATALOGUE_API_ALLOWED_ORIGINS="http://localhost:3001,http://localhost:3000" \
CATALOGUE_API_GQL_ADDRESS="http://localhost:3000/graphql" \
CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS="ws://localhost:3000/graphql" \
CATALOGUE_CLIENT_ADDRESS="http://localhost:3001" \
CATALOGUE_CLIENT_DEFAULT_NOTICES="<Your welcome message here>,info" \
CATALOGUE_DEFAULT_ADMIN_EMAIL_ADDRESSES="comma separated list of admin email addresses" \
docker-compose --env-file docker-compose.env up -d --force-recreate --build
```

Check that the services started successfully: `docker container ls`. There should be running instances of the following services:

- MongoDB
- PostGIS
- Elasticsearch
- Kibana
- API
- Proxy
- Client

Then [configure the API for first use](#api-configuration).

## Containerized deployment
Services can be deployed as individual containers. This is useful for deploying to a an environment with orchestrated container management (such as Kubernetes) and where 3rd party services are managed independently of this deployment (i.e. when connecting to existing MongoDB / PostGIS / Elasticsearch servers). Refer to [individual service documentation](#documentation) for containerizing individual services. Also look at the [docker-compose](docker-compose.yml) configuration to see how Docker images of individual services are built

## Continuous deployment

A continuous deployment workflow is supported for a CentOS 7.6 deployment server

1. Fork the repository, and clone the new fork to your local machine
2. Follow the [instructions](/platform/README.md) to install and configure Ansible on your local machine
3. Setup a CentOS 7 server with a user and SSH login without a password
4. Run the command: `npm run configure-centos-7-server` from the root of the repository
5. Configure [SSL](platform/README.md#ssl) appropriately
6. Setup a Github self-hosted actions runner on the CentOS server (this is from the settings in your forked repository)
7. Adjust the GitHub Actions files (`.github/worklfows/*.yml`) appropriately
8. Push from local to your forked repository to trigger a deployment

## SAEON Data Portal endpoints

### catalogue.saeon.dvn (`next` branch)

- https://catalogue.saeon.dvn
- https://api.catalogue.saeon.dvn
- https://api.catalogue.saeon.dvn/graphql (public API)
- http://api.catalogue.saeon.dvn:5002/graphql (internal API)
- https://proxy.saeon.dvn
- http://catalogue.saeon.dvn:8002|8004|8006|8008|8010 (for proxy logs)
- http://elasticsearch.saeon.dvn
- http://kibana.saeon.dvn
- postgis://catalogue.saeon.dvn:5442
- mongodb://catalogue.saeon.dvn:27017

### catalogue.saeon.ac.za (`stable` branch)

- https://catalogue.saeon.ac.za
- https://api.catalogue.saeon.ac.za
- https://api.catalogue.saeon.ac.za/graphql (public API)
- http://api.catalogue.saeon.int:5002/graphql (internal API)
- https://proxy.saeon.ac.za
- http://catalogue.saeon.int:8002|8004|8006|8008|8010 (for proxy logs)
- http://elasticsearch.saeon.int
- http://kibana.saeon.int
- postgis://catalogue.saeon.int:5442
- mongodb://catalogue.saeon.int:27017

# Documentation

## API

[src/services/api/README.md](src/services/api/)

## Proxy

[src/services/proxy/README.md](src/services/proxy/)

## Client

[src/services/client/README.md](src/services/client/)

## Server configuration

[platform/README.md](platform/)

## NPM packages

[src/packages/README.md](src/packages/)

## Updating Diagrams

[diagrams/README.md](diagrams/)

## Repository tools

[src/tools/README.md](src/tools/)
