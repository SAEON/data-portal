# Source code
A public release of the latest stable source code is available [HERE](https://github.com/SAEONData/catalogue)

# Deployment
Deploy the software stack via the `docker-compose` CLI. From the root directory of the source code run the following shell command:

```sh
CATALOGUE_API_ODP_CLIENT_SECRET="<sensible value>" \
MONGO_DB_USERNAME="<sensible value>" \
MONGO_DB_PASSWORD="<sensible value>" \
POSTGIS_USERNAME="<sensible value>" \
POSTGIS_PASSWORD="<sensible value>" \
CATALOGUE_LATEST_COMMIT=$(git rev-parse HEAD) \ # For logging purposes, but can be omitted
CATALOGUE_DEPLOYMENT_ENV="development" \
ODP_ADDRESS="https://odp.saeon.dvn/api/catalogue" \
CATALOGUE_API_ODP_FILTER_PATH=odp-default-filter.js \
CATALOGUE_API_ADDRESS="https://api.catalogue.saeon.dvn" \
CATALOGUE_API_ALLOWED_ORIGINS="https://catalogue.saeon.dvn,https://api.catalogue.saeon.dvn" \
CATALOGUE_API_GQL_ADDRESS="https://api.catalogue.saeon.dvn/graphql" \
CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS="wss://api.catalogue.saeon.dvn/graphql" \
CATALOGUE_CLIENT_ADDRESS="https://catalogue.saeon.dvn" \
CATALOGUE_CLIENT_DEFAULT_NOTICES="Welcome to the SAEON Catalogue!,info" \
CATALOGUE_CLIENT_FILTER_CONFIG_PATH="default-filter-config.json" \
/usr/local/bin/docker-compose --env-file docker-compose.env up -d --force-recreate --build
```