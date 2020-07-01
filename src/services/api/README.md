# @saeon/api

GraphQL API to be paired with instances of the @saeon/client package

# Quick start

Start an instance of @saeon/proxy (if required)

Start an instance of MongoDB:

```sh
docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -d -p 27017:27017 mongo:latest
```

Then, from the root of the repository:

```sh
npm install
cd src/@saeon/api
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
cd src/@saeon/api
npm ci --only=production
```

#### Start the application

```sh
cd src/@saeon/api
npm run start:prod
```

#### Run as a Docker container

```sh
cd . # From the root of the the saeon-atlas repository
docker build -t atlas-api -f ./src/@saeon/api/Dockerfile .
docker run -p 3000:3000 -d atlas-api
```

#### Check that the application is working!

- http://localhost:3000
- http://localhost:3000/graphql

# Configuration

Optionally create a `.env` file in the root of this package:

```sh
cd src/@saeon/api
touch .env
```

This is a list of configuration options available (with default values indicated)

```sh
MONGO_USER=admin
MONGO_PSWD=password
MONGO_URL=mongodb://localhost:27017
MONGO_DB=atlas-api
GQL_PROVIDER=http://localhost:3000
PORT=3000
NODE_ENV=development
HTTP_PROXY=http://localhost:8001
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```
