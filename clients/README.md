# Client

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Browser support](#browser-support)
- [Start the service](#start-the-service)
- [Build the service](#build-the-service)
- [Docker](#docker)
- [Environment configuration](#environment-configuration)
- [Filter configuration](#filter-configuration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Browser support

Babel is configured to support the following browser targets:

```txt
> 1%
not dead
not IE 11
```

# Start the service

The client needs an API - start an instance of the @saeon/api software to begin with. Then, from the root of the repository:

```sh
# From the client service directory root
npm install
npm start

# The client should be accessible at http://localhost:3001
```

# Build the service

Create static files for deploying to a webserver. Nginx configuration is [included](nginx) in this project

```sh
# From the client service directory root
npm ci --only==production
npm run build # outputs to ./dist. Serve the entire ./dist directory (entry point is index.html)
```

# Docker

For a full list of `--build-arg`'s that is accepted refer to the [Dockerfile](Dockerfile)

```sh
# Create a Docker image
docker build -t client . \
--build-arg CLIENTS_PUBLIC_ADDRESS=http://localhost:3001 \
--build-arg DEPLOYMENT_ENV=development \
... etc

# Run as a Docker container
docker run -p 3001:3001 -d client

# The client should be accessible at http://localhost:3001
```

# Environment configuration

Configuration can be passed to the build context via a `.env`:

```sh
cd src/client
touch .env
```

The full list of possible configuration options and default values is logged to the console in non-production environments. Adjust these values by updating the `.env` file (and restarting the Webpack dev server)

```sh
# .env
API_ADDRESS=...
DEFAULT_ERROR=...
etc
```

# Filter configuration

The catalogue filters are defined via configuration, which is a JSON file. A [default configuration](../../../deploy/README.md) is included in the source. Update deployment configurations by editing the relevant files
