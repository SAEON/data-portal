# Proxy

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Start the service](#start-the-service)
  - [Endpoints](#endpoints)
- [Environment configuration](#environment-configuration)
- [Docker](#docker)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Start the service
```sh
# From the proxy service directory root
npm install
npm start
```

## Endpoints
- http://localhost:8001
- http://localhost:8002 (Nice realtime UI)

# Environment configuration
Default configuration values can be found in [src/config.js](src/config.js). To update the default values, create a `.env` file in the root of the API service source code and adjust values accordingly. For the most part this service just provides limited access to certain SAEON endpoints that should not change regardless of the deployment.

```txt
ELASTICSEARCH_ADDRESS=...
```


# Docker
For a full list of `--build-arg`s that is accepted refer to the [Dockerfile](Dockerfile)

```sh
# Create a Docker image
docker build -t proxy . \
--build-arg ELASTICSEARCH_ADDRESS=http://elasticsearch:9200 \
... etc

# Run as a Docker container
docker run -p 8001:8001 -p 8002:8002 -d proxy
```