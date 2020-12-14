
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Start the service](#start-the-service)
  - [Endpoints](#endpoints)
- [Environment configuration](#environment-configuration)
- [ODP integration configuration](#odp-integration-configuration)
  - [ODP integration schedule](#odp-integration-schedule)
- [Docker](#docker)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Start the service
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
Default configuration values can be found in [src/config.js](src/config.js). To update the default values, create a `.env` file in the root of the API service source code and adjust values accordingly

```txt
MONGO_DB_USERNAME=...
MONGO_DB_PASSWORD=...
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

## ODP integration schedule
To adjust the schedule of the ODP integration, specify a different schedule to the default, and make sure that rebuilding the index is enabled

```sh
# .env
CATALOGUE_API_INDEX_REBUILD_SCHEDULE='0 0 0 * * *'
CATALOGUE_API_INDEX_REBUILD=enabled
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


