# @saeon/api
Node.js GraphQL API

#### Run as a Docker container

```sh
cd src/services/api
docker build -t api . --build-arg ELASTICSEARCH_ADDRESS=http://elasticsearch:9200 --build-arg MONGO_DB_ADDRESS=mongodb://mongo:27017
docker run --net=catalogue -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 -d api
```

## Configure the integration
The API integrates with the ODP. This process can be configured to include/exclude certain records by providing a JavaScript filter function. The default filter is defined in the API source code root folder - [this file](odp-default-filter.js)

Provide a path to a different filter function to configure this filter:

```sh
# .env
CATALOGUE_API_ODP_FILTER_PATH=some-other-filter.js # This assumes you have copied the file to the root of the API source code (src/services/api)
```

For example, to include records for only one project, the filter function could look like this:

```js
export default (record) => {
  if (record.projects.includes('MIMS')) {
    return true
  } else {
    console.log('Excluding record for projects', record.projects)
    return false
  }
}
```