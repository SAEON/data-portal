# SAEON/postgis
The base postgis/postgis image does not have PostGIS-related CLIs enabled. To use PostGIS CLIs that are NOT enabled by default (for example `raster2pgsql`) it's necessary to extend the base image.

```sh
# Create a Docker image
docker build -t postgis .

# Run as a Docker container
docker run --name postgis --net=catalogue -p 5432:5432 --restart always -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=databooks -d postgis
```