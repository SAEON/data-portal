# @SAEON/CATALOGUE

An interactive tool for searching and exploring SAEON-curated datasets

# Source code
A public release of the source code is available [HERE](https://github.com/SAEONData/catalogue)

# Tech Stack

- Docker
- MongoDB
- Elasticsearch
- PostGIS
- GraphQL API (Node.js)
- Proxy API (Node.js + [anyproxy](http://anyproxy.io/))
- Browser client ([React.js](https://reactjs.org/) / [Material UI](https://material-ui.com/))

# Deployment
Deploy the software stack via the `docker-compose` CLI. From the root directory of the source code run the following shell command:

```sh
MONGO_DB_ADDRESS="mongodb://mongo:27017" \
MONGO_DB_USERNAME="<username>" \
MONGO_DB_PASSWORD="<password>" \
POSTGIS_HOST="postgis" \
POSTGIS_PORT="5432" \
POSTGIS_USERNAME="<username>" \
POSTGIS_PASSWORD="<password>" \
CATALOGUE_API_RESET_POSTGIS="disabled"
ELASTICSEARCH_ADDRESS="http://elasticsearch:9200" \
CATALOGUE_LATEST_COMMIT=$(git rev-parse HEAD) \ # GIT is required
CATALOGUE_DEPLOYMENT_ENV="development" \
CATALOGUE_PROXY_ADDRESS="http://proxy:8001" \
CATALOGUE_API_ADDRESS="http://localhost:3000" \
CATALOGUE_API_ALLOWED_ORIGINS="http://localhost:3001,http://localhost:3000" \
CATALOGUE_API_RESET_ELASTICSEARCH_INDEX="enabled" \
CATALOGUE_API_RESET_ELASTICSEARCH_TEMPLATE="enabled" \
CATALOGUE_API_RESET_POSTGIS="disabled" \
CATALOGUE_API_GQL_ADDRESS="http://localhost:3000/graphql" \
CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS="ws://localhost:3000/graphql" \
CATALOGUE_CLIENT_AUTH_REDIRECT_URL="http://localhost:3001/authenticated" \
CATALOGUE_CLIENT_ADDRESS="http://localhost:3001" \
CATALOGUE_CLIENT_DEFAULT_NOTICES="<Your welcome message here>,info" \
docker-compose --env-file docker-compose.env up -d --force-recreate --build
```