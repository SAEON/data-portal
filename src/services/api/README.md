# @saeon/api

GraphQL API to be paired with instances of the @saeon/client package

# Quick start

1. Make sure Node.js ^14.4 is installed
2. Start an instance of @saeon/proxy (if required)
3. Start an instance of MongoDB:

```sh
docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -d -p 27017:27017 mongo:latest
```

4. Start an instance of Postgres/Postgis:
```sh
docker run --name postgis --restart always -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=catalogue -d -p 5442:5432  postgis/postgis:12-3.0
```

5. Start an instance of Elasticsearch and Kibana:

```sh
TODO
```

6. Then, from the root of the repository:

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
cd . # From the root of the repository
docker build -t api -f ./src/@saeon/api/Dockerfile .
docker run -p 3000:3000 -d api
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
MONGO_DB=catalogue
CATALOGUE_SECRET=secret-string
GQL_PROVIDER=http://localhost:3000
PORT=3000
DEPLOY_ENV=development
NODE_ENV=development
HTTP_PROXY=http://localhost:8001
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```
