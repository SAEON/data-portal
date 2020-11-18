# @saeon/api

Node.js GraphQL API to be paired with instances of the @saeon/client package

#### Run as a Docker container
<!-- TODO - config is not working  -->

```sh
cd src/services/api # From the root of the repository
docker build -t api .
docker run -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 -d api
```
