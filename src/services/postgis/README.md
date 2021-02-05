# PostGIS
It's necessary to extend the PostGIS Docker image that we use to enable PostGIS CLIs within the container.

```sh
# Create a Docker image
docker build -t postgis .

# Run as a Docker container
docker run --name postgis --net=catalogue -p 5432:5432 --restart always -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=databooks -d postgis
```