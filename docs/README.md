# Source code
A public release of the latest stable source code is available [HERE](https://github.com/SAEONData/catalogue)

# Deployment
Deploy the software stack via the `docker-compose` CLI. From the root directory of the source code run the following shell command:

```sh
CATALOGUE_API_ODP_CLIENT_SECRET="<secret>" \
MONGO_DB_USERNAME="<username>" \
MONGO_DB_PASSWORD="<password>" \
POSTGIS_USERNAME="<username>" \
POSTGIS_PASSWORD="<password>" \
CATALOGUE_API_RESET_POSTGIS="disabled" \
CATALOGUE_LATEST_COMMIT= \
CATALOGUE_DEPLOYMENT_ENV="development" \
CATALOGUE_API_ADDRESS="http://localhost:3000" \
CATALOGUE_API_ALLOWED_ORIGINS="http://localhost:3001,http://localhost:3000" \
CATALOGUE_API_RESET_POSTGIS="disabled" \
CATALOGUE_API_GQL_ADDRESS="http://localhost:3000/graphql" \
CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS="ws://localhost:3000/graphql" \
CATALOGUE_CLIENT_ADDRESS="http://localhost:3001" \
CATALOGUE_CLIENT_DEFAULT_NOTICES="<Your welcome message here>,info" \
CATALOGUE_DEFAULT_ADMIN_EMAIL_ADDRESSES="comma separated list of admin email addresses" \
docker-compose --env-file docker-compose.env up -d --force-recreate --build
```