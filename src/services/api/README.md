# @saeon/api

Node.js GraphQL API to be paired with instances of the @saeon/client package

#### Run as a Docker container

```sh
cd src/services/api # From the root of the repository
docker build -t api . --build-arg ELASTICSEARCH_ADDRESS=http://elasticsearch:9200 --build-arg MONGO_DB_ADDRESS=mongodb://mongo:27017
docker run --net=catalogue -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 -d api
```
