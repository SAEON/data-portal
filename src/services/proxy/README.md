# @saeon/proxy

This package runs an instance of the MIT-licensed `anyproxy` Node.js proxy server, with rules specific to the SAEON deployment. Depending on specific deployment environments, this package may or may not be required.

# Quick start

Make sure that Node.js ^14.4 is installed. From the root of the repository:

```sh
npm install
cd src/@saeon/proxy
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
cd src/@saeon/proxy
npm ci --only=production
```

#### Start the application

```sh
cd src/@saeon/proxy
npm run start:prod
```

#### Run as a Docker container

```sh
cd . # From the root of the the saeon-atlas repository
docker build -t anyproxy -f ./src/@saeon/proxy/Dockerfile .
docker run -p 8001:8001 -p 8002:8002 -d anyproxy
```

#### Check that the application is working!

- The proxy is available at http://localhost:8001
- A realtime UI is available at http://localhost:8002

# Configuration

Optionally create a `.env` file in the root of this package

```
cd src/@saeon/proxy
touch .env
```

This is a list of configuration options available (with default values indicated)

```sh
# Geneal
PORT=8001
ENABLE_WEB_INTERFACE=true
WEB_INTERFACE_PORT=8002
THROTTLE=10000

# SAEON specific
SAEON_SPATIALDATA_PROXY=http://app01.saeon.ac.za
SAEON_SPATIALDATA_PROXY2=http://196.21.191.55
SAEON_ELK_PROXY=http://192.168.116.66:9200
CSIR_ESRI_PROXY=https://pta-gis-2-web1.csir.co.za/server2/rest/services
HST_ESRI_PROXY=https://gisportal.saeon.ac.za/server/rest/services
```
