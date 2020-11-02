# @SAEON/CATALOGUE
[1.0.0](/assets/releases/v1.0.0.zip)

**_Please note that this is still in development._**

This is a tool for exploring SAEON's metadata catalogues interactively, and with specific emphasis of searching for datasets that contain OGC-compliant resources. This tool is currently deployed at [catalogue.saeon.ac.za](https://catalogue.saeon.ac.za), but the intention is that bespoke deployments are supported that allow for configuring any number of catalogues to be searched.

# Quick start
Setup the repository for development. The repository _should_ be supported cross-platform - on any platform that `Node.js` can be installed. However, this workflow has only been tested on Ubuntu.

#### System requirements
1. Docker Desktop
2. Node.js __v14.13__ (Lower versions simply won't work)

```sh
# Download the source code
git clone git@github.com:SAEONData/catalogue.git catalogue
cd catalogue

# Make sure that Node.js ^14.13 is installed. Follow the instructions at https://github.com/nodesource/distributions/blob/master/README.md#debinstall
# Assuming an Ubuntu Linux environment
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install gcc g++ make # Required for building node-sass and other modules with native bindings
sudo apt-get install -y nodejs

# Update repository git configuration
npm run configure-git

# Install package dependencies (this might take several minutes on the first run)
npm run install-dependencies
```
 
### Start the services

The catalogue software comprises three services, and is dependant on additional 3rd party services (MongoDB, Elasticsearch). These services all need to be started (order is important). The first time you start the catalogue services you need to be on the SAEON VPN - Elasticsearch is configured automatically and populated with data made available via the the SAEON VPN. After the first start you don't have to connect to the VPN when developing on your local machine. Note that there is also a docker-compose file available, which is employed within the Deployment section.

#### MongoDB

```sh
docker run --name mongo --restart always -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -d -p 27017:27017 mongo:4.4.1
```

#### Postgis

```sh
docker run --name postgis --restart always -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=catalogue -d -p 5432:5432  postgis/postgis:12-3.0
```

#### Elasticsearch

```sh
# Setup a network so that ELK services can communicate with each other
docker network create --driver bridge elk

# Elasticsearch
docker run --net=elk --name elasticsearch --restart always -e xpack.license.self_generated.type=basic -e xpack.security.enabled=false -e discovery.type=single-node -d -p 9200:9200 -p 9300:9300 docker.elastic.co/elasticsearch/elasticsearch:7.9.2

# Kibana (optional)
docker run --net=elk --name kibana --restart always -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 -d -p 5601:5601 docker.elastic.co/kibana/kibana:7.9.2
```

#### [@saeon/api](/src/services/api)

```sh
npm run start:api
```

#### [@saeon/proxy](/src/services/proxy)

```sh
npm run start:proxy
```

#### [@saeon/catalogue](/src/services/client)

```sh
npm run start:client
```

# Deployment

Continuous deployment is supported targeting a CentOS 7 environment

1. Fork the repository, and clone the new fork to your local machine
2. Follow the [instructions](/platform-configuration/ansible/README.md) to install and configure Ansible on your local machine, and setup a CentOS 7 server with a user and SSH login without a password
3. Run the command: `npm run configure-centos-7-server` from the root of the repository
4. Setup a Github self-hosted actions runner on the CentOS server (this is from the settings in your forked repository)
5. Adjust the `.github/workflows/next.yml` and `.github/workflows/stable.yml` files to include configuration variables sensible for your environment (refer to the section on "Configuration" below)
6. Push from local to your forked repository to trigger a deployment

## SAEON's Deployment context

As of September 2020 SAEON currently deploys two instances of the catalogue stack - a development and a production instance. For a full breakdown of services that run to support an instance of the catalogue stack refer [the docker compose file](/docker-compose.yml). To replicate the SAEON deployment, use `docker-compose`. Endpoints of SAEON's development and production deployment are listed below.

```sh
# Clone the repo
git clone <...> catalogue-fork

# Add configuration for docker-compose.yml scripts
echo "MONGO_DB_USERNAMENAME=<user>" > .env
echo "MONGO_PASSWORD=<pswd>" >> .env

# Build and run the images
docker-compose up -d --force-recreate --build
```

#### SAEON development endpoints

```
catalogue.saeon.dvn
api.catalogue.saeon.dvn (/graphql & /proxy)
elasticsearch.saeon.dvn
kibana.saeon.dvn
```

#### SAEON production endpoints

```
catalogue.saeon.ac.za
api.catalogue.saeon.ac.za (/graphql & /proxy)
elasticsearch.saeon.int (available publicly via api.catalogue.saeon.ac.za/proxy)
kibana.saeon.int
```

## Deploying individual services

Deploy services in the `src/services` directory individually as docker containers via the `docker` CLI. Note that compared to the `docker` CLI commands above, 3rd party services are configured slightly differently in the `docker-compose` deployment.

```sh
docker build -t <image name> -f ./src/services/<service name>/Dockerfile .
docker run <image name>
```

#### Configuration

Build-time configuration essentially involves:

1. Creating `.env` files with appropriate values at the beginning of the build process (overwriting existing .env files)
2. Copying these `.env` files along with source code into the Docker build context, so that they are accessible during container runtime

This is achieved using GitHub actions software. The configuration is specified in the [workflow file](/.github/workflows/deploy-master.yml). Adjusting accordingly in repository forks and continuous deployment should (theoretically) work out the box if a self-hosted actions runner is configured on your server.

# NPM packages

This project includes some bespoke NPM package development:

- [@saeon/ol-react](/src/packages/ol-react)
- [@saeon/snap-menus](/src/packages/snap-menus)
- [@saeon/logger](/src/packages/logger)

To publish packages to the public NPM registry (where all the @saeon packages are published) you need to [create an NPM account](https://docs.npmjs.com/creating-a-new-npm-user-account). This allows you to publish the packages - you will also need to make sure that you are part of the @saeon organization. To publish these packages under new names you will need to fork the repository, and then update the `name` fields in all the `package.json` files.

Once you have an account you should be able to login via the CLI:

```sh
npm login
```

### Publishing packages to NPM

During development packages are referenced directly via the source code entry point. During deployment packages are consumed from the NPM registry. This means that when making changes to dependency packages, these packages need to be re-published. This is straightforward; from the root of a package that supports publishing to NPM, these scripts are available:

- `npm run publish:patch`
- `npm run publish:minor`
- `npm run publish:major`

It's also possible to publish all packages at once; from the root of this repository, these scripts are available:

- `npm run publish-all-packages:patch`
- `npm run publish-all-packages:minor`
- `npm run publish-all-packages:major`

Running one of these scripts will result in all other packages updating their dependency lists to use the newly published package versions. **However**. If you published a package individually, then you will need to update the dependency version where the package is used. This can either be done manually via updating the appropriate `package.json` file, or all at once:

- `npm run update-packages`

It's also useful to see which packages will be updated by this script. To do that, run:

- `npm run check-package-updates`

# TODO

- [docs](/src/services/docs)
- [reporting](/src/services/reporting)
