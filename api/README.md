# API

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Start the service](#start-the-service)
  - [Endpoints](#endpoints)
- [Environment configuration](#environment-configuration)
- [ODP integration configuration](#odp-integration-configuration)
  - [ODP integration](#odp-integration)
- [Docker](#docker)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Start the service
Some configuration is required (refer to "Environment configuration" below). After adding an appropriate .env file, control the service via NPM.

```sh
# From the /api folder
npm install
chomp --watch
```

## Endpoints
- http://localhost:3000
- http://localhost:3000/graphql (GraphQL Playground)

# Environment configuration
Default configuration values can be found in [src/config/index.js](src/config/index.js). To update the default values, create a `.env` file in the root of the API service source code and adjust values accordingly. At a minimum, to use the service for the first time you will need to include the following configuration

```sh
# api/.env
ODP_CLIENT_SECRET=<some secret>
DEFAULT_ADMIN_EMAIL_ADDRESSES="comma separated list of email addresses"
```

# ODP integration configuration
The API integrates with the ODP. This process can be configured to include/exclude certain records by providing a JavaScript filter function. The default filter is defined in the API source code root folder - [this file](odp-default-filter.js)

Provide a path to a different filter function to configure this filter:

```sh
# .env
ODP_FILTER_PATH=some-other-filter.js # This assumes you have copied the file to the root of the API source code
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

# Docker
For a full list of `--build-arg`s and `-e` options refer to the [Dockerfile](Dockerfile)

```sh
# Create a Docker image
docker build \
  --build-arg SOME_ARG=some-value \
  --build-arg ...etc \
  -t api .

# Run as a Docker container
docker run \
  --net=saeon_local \
  -e SOME_ENV=some-value \
  -e ...etc \
  -p 3000:3000 \
  -d \
  api
```
