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

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quick start](#quick-start)
  - [System requirements](#system-requirements)
  - [Local development](#local-development)
    - [Endpoints](#endpoints)
- [Deployment and installation](#deployment-and-installation)
  - [Docker-compose](#docker-compose)
  - [Continuous deployment](#continuous-deployment)
    - [Gotchas](#gotchas)
  - [SAEON Data Portal endpoints](#saeon-data-portal-endpoints)
    - [catalogue.saeon.dvn (`next` branch)](#cataloguesaeondvn-next-branch)
    - [catalogue.saeon.ac.za (`stable` branch)](#cataloguesaeonacza-stable-branch)
- [Documentation](#documentation)
  - [API](#api)
  - [Proxy](#proxy)
  - [Client](#client)
  - [Server configuration](#server-configuration)
  - [NPM packages](#npm-packages)
  - [Repository tools](#repository-tools)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Quick start

Setup the repository for development on a local machine. The Node.js and React services are run using a local installation of Node.js, and dependant services (Mongo, Elasticsearh, PostGIS, GDAL) are run via Docker containers

## System requirements

1. Docker Desktop
2. Node.js **v14.15.1** (Versions lower than **v14.13** will not work. I have not tested newer versions yet)

```sh
# Download the source code
git clone git@github.com:SAEONData/catalogue.git catalogue
cd catalogue

# Make sure that Node.js ^14.13 is installed. Follow the instructions at https://github.com/nodesource/distributions/blob/master/README.md#debinstall
# Assuming an Ubuntu Linux environment
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install gcc g++ make # Required for building node-sass and other modules with native bindings
sudo apt-get install -y nodejs

# Update repository git configuration
npm run configure-git

# Install package dependencies (this might take several minutes on the first run)
npm run install-dependencies
```

## Local development

The catalogue software comprises three services, and is dependant on additional 3rd party services. These services all need to be started (order is important). **_The first time you start the catalogue services you need to be on the SAEON VPN_** - Elasticsearch is configured automatically and populated with data made available via the the SAEON Open Data Platform (ODP). After the first start you don't need to be connected to the VPN when developing on your local machine.

```sh
# Create a Docker network (required on local since GDAL is run Dockerized)
docker network create --driver bridge catalogue

# Start a MongoDB server
docker run --net=catalogue --name mongo --restart always -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -d -p 27017:27017 mongo:4.4.1

# Start a PostGIS server
docker run --net=catalogue --name postgis --restart always -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=databooks -d -p 5432:5432  postgis/postgis:12-3.0

# Start an Elasticsearch server (you can connect to elasticsearch.saeon.dvn instead if you want. Refer to the API service documentation)
docker run --net=catalogue --name elasticsearch --restart always -e xpack.license.self_generated.type=basic -e xpack.security.enabled=false -e discovery.type=single-node -d -p 9200:9200 -p 9300:9300 docker.elastic.co/elasticsearch/elasticsearch:7.10.0

# Start a Kibana service (this is helpful if you are working on Elasticsearch configuration, but isn't required)
docker run --net=catalogue --name kibana --restart always -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 -d -p 5601:5601 docker.elastic.co/kibana/kibana:7.10.0

# Start the Node.js proxy server
npm run start:proxy

# Start the Node.js API server
npm run start:api

# Start the React.js client
npm run start:client
```

### Endpoints

- http://localhost:3001
- http://localhost:3000
- http://localhost:3000/graphql
- http://localhost:3000/proxy (also http://localhost:8001)
- http://localhost:8002 (for proxy logs)
- http://localhost:9200
- http://localhost:5601
- postgis://localhost:5432
- mongodb://localhost:27017

# Deployment and installation

## Docker-compose
From the root of the source code directory run the following shell command:

```sh
MONGO_DB_USERNAME="<username>" \
MONGO_DB_PASSWORD="<password>" \
POSTGIS_USERNAME="<username>" \
POSTGIS_PASSWORD="<password>" \
CATALOGUE_API_RESET_POSTGIS="disabled"
CATALOGUE_LATEST_COMMIT= \
CATALOGUE_DEPLOYMENT_ENV="development" \
CATALOGUE_API_ADDRESS="http://localhost:3000" \
CATALOGUE_API_ALLOWED_ORIGINS="http://localhost:3001,http://localhost:3000" \
CATALOGUE_API_RESET_ELASTICSEARCH_INDEX="enabled" \
CATALOGUE_API_RESET_ELASTICSEARCH_TEMPLATE="enabled" \
CATALOGUE_API_RESET_POSTGIS="disabled" \
CATALOGUE_API_GQL_ADDRESS="http://localhost:3000/graphql" \
CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS="ws://localhost:3000/graphql" \
CATALOGUE_CLIENT_AUTH_REDIRECT_URL="http://localhost:3001/authenticated" \
CATALOGUE_CLIENT_ADDRESS="http://localhost:3001" \
CATALOGUE_CLIENT_DEFAULT_NOTICES="<Your welcome message here>,info" \
docker-compose --env-file docker-compose.env up -d --force-recreate --build
```

## Continuous deployment

A continuous deployment workflow is supported for a CentOS 7.6 deployment server

1. Fork the repository, and clone the new fork to your local machine
2. Follow the [instructions](/platform/README.md) to install and configure Ansible on your local machine, and setup a CentOS 7 server with a user and SSH login without a password
3. Run the command: `npm run configure-centos-7-server` from the root of the repository
4. Setup a Github self-hosted actions runner on the CentOS server (this is from the settings in your forked repository)
5. Adjust the GitHub Actions files (`.github/worklfows/*.yml`) appropriately
6. Push from local to your forked repository to trigger a deployment

### Gotchas
One would think that configuring the server would include Nginx configuration. Currently Nginx is configured by GitHub actions. This is definitely not very intuitive and will change in the future. But for now the only way of completing the deployment is by setting up GitHub actions after setting up the server

## SAEON Data Portal endpoints

### catalogue.saeon.dvn (`next` branch)

- http://catalogue.saeon.dvn
- http://api.catalogue.saeon.dvn
- http://api.catalogue.saeon.dvn/proxy
- http://api.catalogue.saeon.dvn/graphql
- http://proxy.catalogue.saeon.dvn (for proxy logs)
- http://elasticsearch.saeon.dvn
- http://kibana.saeon.dvn
- postgis://catalogue.saeon.dvn:5442
- mongodb://catalogue.saeon.dvn:27017

### catalogue.saeon.ac.za (`stable` branch)

- https://catalogue.saeon.ac.za
- https://api.catalogue.saeon.ac.za
- https://api.catalogue.saeon.ac.za/proxy
- https://api.catalogue.saeon.ac.za/graphql
- http://proxy.catalogue.saeon.int (for proxy logs)
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
## Repository tools
[src/tools/README.md](src/tools/)