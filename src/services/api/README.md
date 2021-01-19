# API

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Start the service](#start-the-service)
  - [Endpoints](#endpoints)
- [Environment configuration](#environment-configuration)
- [PostGIS configuration](#postgis-configuration)
- [ODP integration configuration](#odp-integration-configuration)
  - [ODP integration](#odp-integration)
- [Docker](#docker)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Start the service
Some configuration is required (refer to "Environment configuration" below). After adding an appropriate .env file, control the service via NPM.

```sh
# From the API service directory root
npm install
npm start
```

## Endpoints
- http://localhost:3000
- http://localhost:8000/graphql (GraphQL Playground)
- http://localhost:3000/proxy (Address for proxying)

# Environment configuration
Default configuration values can be found in [src/config.js](src/config.js). To update the default values, create a `.env` file in the root of the API service source code and adjust values accordingly. At a minimum, to use the service for the first time you will need to include the following configuration

```sh
# src/services/api/.env
CATALOGUE_API_ODP_CLIENT_SECRET=<some secret>
CATALOGUE_DEFAULT_ADMIN_EMAIL_ADDRESSES="comma separated list of email addresses"
```

# PostGIS configuration
Make sure you are logged in by navigating to `/login`. Then navigate to `/graphql`. Run the following mutation

```graphql
mutation {
  configureDefaultPostGISLayers
}
```

# ODP integration configuration
The API integrates with the ODP. This process can be configured to include/exclude certain records by providing a JavaScript filter function. The default filter is defined in the API source code root folder - [this file](odp-default-filter.js)

Provide a path to a different filter function to configure this filter:

```sh
# .env
CATALOGUE_API_ODP_FILTER_PATH=some-other-filter.js # This assumes you have copied the file to the root of the API source code (src/services/api)
```

For example, to include records for only one project, the filter function could look like this:

```js
export default (record) => {
  if (record.projects.includes('MIMS')) {
    return true
  } else {
    console.log('Excluding record for projects', record.projects)
    return false
  }
}
```

## ODP integration
Make sure you are logged in by navigating to `/login`. Then navigate to `/graphql`. Run the following mutations to setup the ODP integration

```graphql
# Create the Elasticsearch template
mutation {
  configureElasticsearchTemplate
}

# Insert documents from the ODP into Elasticsearch
mutation {
  configureElasticsearchIndex
}
```

# Docker
For a full list of `--build-arg`s that is accepted refer to the [Dockerfile](Dockerfile)

```sh
# Create a Docker image
docker build -t api . \
--build-arg ELASTICSEARCH_ADDRESS=http://elasticsearch:9200 \
--build-arg MONGO_DB_ADDRESS=mongodb://mongo:27017 \
... etc

# Run as a Docker container
docker run --net=catalogue -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 -d api
```


