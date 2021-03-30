# Source code
A public release of the latest stable source code is available [HERE](https://github.com/SAEONData/catalogue)

# Deployment
Deploy the software stack via the `docker-compose` CLI. From the root directory of the source code run the following shell command:

```sh
docker-compose --env-file docker-compose.env up -d --force-recreate --build
```

(NOTE - the command doesn't work with default configurations yet. This is a TODO)