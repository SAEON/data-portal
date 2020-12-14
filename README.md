![next](https://github.com/SAEON/catalogue/workflows/deployment@next/badge.svg?branch=next)
![stable](https://github.com/SAEON/catalogue/workflows/deployment@stable/badge.svg?branch=stable)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Tech Stack](#tech-stack)
- [Quick start](#quick-start)
  - [System requirements](#system-requirements)
  - [Local development](#local-development)
- [Deployment and installation](#deployment-and-installation)
  - [Docker-compose](#docker-compose)
  - [Continuous deployment](#continuous-deployment)
  - [SAEON deployment information](#saeon-deployment-information)
    - [Development endpoints](#development-endpoints)
    - [Production endpoints](#production-endpoints)
- [Software documentation](#software-documentation)
  - [API](#api)
  - [Proxy](#proxy)
  - [Client](#client)
  - [NPM packages](#npm-packages)
  - [Repository tools](#repository-tools)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Tech Stack

- Docker
- MongoDB
- Elasticsearch
- PostGIS
- GraphQL API (Node.js)
- Proxy API (Node.js / [anyproxy](http://anyproxy.io/))
- Browser client ([React.js](https://reactjs.org/) / [Material UI](https://material-ui.com/))

# Quick start

Setup the repository for development

## System requirements

1. Docker Desktop
2. Node.js **v14.13** (Lower versions simply won't work)

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

# Deployment and installation

## Docker-compose
From the root directory of the source code run the following shell command:

```sh
MONGO_DB_ADDRESS="mongodb://mongo:27017" \
MONGO_DB_USERNAME="<username>" \
MONGO_DB_PASSWORD="<password>" \
POSTGIS_HOST="postgis" \
POSTGIS_PORT="5432" \
POSTGIS_USERNAME="<username>" \
POSTGIS_PASSWORD="<password>" \
CATALOGUE_API_RESET_POSTGIS="disabled"
ELASTICSEARCH_ADDRESS="http://elasticsearch:9200" \
CATALOGUE_LATEST_COMMIT=$(git rev-parse HEAD) \ # GIT is required
CATALOGUE_DEPLOYMENT_ENV="development" \
CATALOGUE_PROXY_ADDRESS="http://proxy:8001" \
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
2. Follow the [instructions](/platform/ansible/README.md) to install and configure Ansible on your local machine, and setup a CentOS 7 server with a user and SSH login without a password
3. Run the command: `npm run configure-centos-7-server` from the root of the repository
4. Setup a Github self-hosted actions runner on the CentOS server (this is from the settings in your forked repository)
5. Adjust the GitHub Actions files (`.github/worklfows/*.yml`) appropriately
6. Push from local to your forked repository to trigger a deployment

## SAEON deployment information

### Development endpoints

1. http://catalogue.saeon.dvn
2. http://api.catalogue.saeon.dvn
3. http://api.catalogue.saeon.dvn/proxy
4. http://api.catalogue.saeon.dvn/graphql
5. http://proxy.catalogue.saeon.dvn (for proxy logs)
6. http://elasticsearch.saeon.dvn
7. http://kibana.saeon.dvn

### Production endpoints

1. https://catalogue.saeon.ac.za
2. https://api.catalogue.saeon.ac.za
3. https://api.catalogue.saeon.ac.za/proxy
4. https://api.catalogue.saeon.ac.za/graphql
5. http://proxy.catalogue.saeon.int (for proxy logs)
6. http://elasticsearch.saeon.int
7. http://kibana.saeon.int

# Software documentation

## [API](src/services/api/README.md)
## [Proxy](src/services/proxy/README.md)
## [Client](src/services/client/README.md)
## [NPM packages](src/packages/README.md)
## [Repository tools](src/tools/README.md)