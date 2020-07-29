# @saeon/client

# Browser support

Builds are configured to support browsers with over 1% market share, excluding Internet Explorer, as configured in the [@saeon/client build](.browserslistrc). As of 11 May 2020, these include:

- chrome: 80
- edge: 18
- firefox: 74
- ios: 12.2
- safari: 13
- samsung: 11.1

# Quick start

The client needs an API - start an instance of the @saeon/api software to begin with. Then, from the root of the repository:

```sh
npm install
cd src/@saeon/client
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
cd src/@saeon/client
npm ci --only=production
```

#### Build the application

Serving the web client involves setting up a webserver to serve static files. This is easiest to do via Nginx since the configuration required for Nginx is [included](/nginx) in this repository. The static files need to be built:

```sh
cd src/@saeon/api
npm run build # output is /dist, the entry point is /dist/index.html
```

#### Run as a Docker container

```sh
cd . # From the root of the the saeon-atlas repository
docker build -t atlas-c lient -f ./src/@saeon/api/Dockerfile .
docker run -p 3001:3001 -d atlas-client
```

#### Check that the application is working!

The client should be accessible at http://localhost:3001

## Configuration

Optionally create a `.env` file in the root of this package:

```sh
cd src/@saeon/client
touch .env
```

This is a list of configuration options available (with default values indicated)

```sh
CATALOGUE_API_ADDRESS=http://localhost:3000
DEFAULT_ERROR= # default error message shown on startup
DEFAULT_WARNING= # default warning message shown on startup
DEFAULT_INFO= # default info message shown on startup
DEFAULT_SUCCESS=# default success message shown on startup
GQL_PROVIDER=http://localhost:3000/graphql
GQL_SUBSCRIPTIONS_PROVIDER=ws://localhost:3000/graphql
SOURCE_CODE_URI=https://github.com/SAEONData/saeon-atlas/tree/master/src/@saeon/client
```

## Docker deployment

```
docker build -t atlas-client -f ./src/@saeon/client/Dockerfile .
```
