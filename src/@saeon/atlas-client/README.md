# @saeon/atlas-client

# Quick start

The client needs an API - start an instance of the @saeon/atlas-api software to begin with. Then, from the root of the repository:

```sh
npm install
cd src/@saeon/atlas-client
npm install
npm start
```

# Deployment

#### Install global repository packages

```sh
npm ci --only=production
```

#### Install local packages

```sh
cd src/@saeon/atlas-client
npm ci --only=production
```

#### Build the application

Serving the web client involves setting up a webserver to serve static files. This is easiest to do via Nginx since the configuration required for Nginx is [included](/nginx) in this repository. The static files need to be built:

```sh
cd src/@saeon/atlas-api
npm run build # output is /dist, the entry point is /dist/index.html
```

#### Run as a Docker container

```sh
cd . # From the root of the the saeon-atlas repository
docker build -t atlas-c lient -f ./src/@saeon/atlas-api/Dockerfile .
docker run -p 3001:3001 -d atlas-client
```

#### Check that the application is working!

The client should be accessible at http://localhost:3001

## Configuration

Optionally create a `.env` file in the root of this package:

```sh
cd src/@saeon/atlas-client
touch .env
```

This is a list of configuration options available (with default values indicated)

```sh
ATLAS_API_ADDRESS=http://localhost:3000
DEFAULT_ERROR= # default error message shown on startup
DEFAULT_WARNING= # default warning message shown on startup
DEFAULT_INFO= # default info message shown on startup
DEFAULT_SUCCESS=# default success message shown on startup
GQL_PROVIDER=http://localhost:3000/graphql
GQL_SUBSCRIPTIONS_PROVIDER=ws://localhost:3000/graphql
```

## Docker deployment

```
docker build -t atlas-client -f ./src/@saeon/atlas-client/Dockerfile .
```
