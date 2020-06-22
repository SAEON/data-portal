<!-- GitHub build -->

![DEV](https://github.com/SAEONData/saeon-atlas/workflows/DEV/badge.svg)

TODO
- Single .browserslistrc

# @SAEON/ATLAS

**_Please note that this is still in development._**

This is a tool for exploring SAEON's metadata catalogues interactively, and with specific emphasis of searching for datasets that contain OGC-compliant resources. This tool is currently deployed at [atlas.saeon.ac.za](https://atlas.saeon.ac.za), but the intention is that bespoke deployments are supported that allow for configuring any number of catalogues to be searched.

The repository is organized as a 'monorepo', split according to the following packages:

- [@saeon/atlas-client](/src/services/atlas-client)
- [@saeon/atlas-api](/src/services/atlas-api)
- [@saeon/anyproxy](/src/services/anyproxy)
- [@saeon/catalogue-search](/src/packages/catalogue-search)
- [@saeon/ol-react](/src/packages/ol-react)
- [@saeon/snap-menus](/src/packages/snap-menus)
- [@saeon/logger](/src/packages/logger)
- [docs](/src/services/docs)
- [reporting](/src/services/reporting)
- [NPM package generator](/src/generators/npm-package)
- [React client generator](/src/generators/react-client)

Refer to these links for specific package documentation.

# Browser support

Builds are configured to support browsers with over 1% market share, excluding Internet Explorer, as configured in the [@saeon/atlas-client build](/src/services/atlas-client/.browserslistrc). As of 11 May 2020, these include:

- chrome: 80
- edge: 18
- firefox: 74
- ios: 12.2
- safari: 13
- samsung: 11.1

# Tech Stack

- API
  - Node.js server
  - Proxy server ([anyproxy](http://anyproxy.io/))
- Browser client
  - [React.js](https://reactjs.org/)
  - [OpenLayers 6](https://openlayers.org/)
  - [Material UI](https://material-ui.com/)

# Quick start

Packages are mostly self-contained, in that each package includes a `package.json` file, and tracks it's own dependencies. For development purposes it's useful that packages can reference source code in other packages (instead of build output), and for this reason Babel is configured globally.

### Setup the repository for development

NOTE: This repository only support Linux/Mac development currently, since it's farily straightforward to configure a Linux development environment using WSL on Windows (or similar). If there is interest in further cross platform support please [request this](https://github.com/SAEONData/saeon-atlas/issues).

```sh
# Download the source code
git clone git@github.com:SAEONData/saeon-atlas.git saeon-atlas
cd saeon-atlas

# Sometimes the scripts in scripts/ don't get the correct permissions set on clone,
# and when they are adjusted. This could be related to using WSL. Fix this
chmod +x scripts/*.sh

# Install package dependencies (this might take several minutes on the first run)
npm run install-package-dependencies

# Update repository git configuration
npm run configure-git

# A global install of npm-check-updates is required to use some of the package.json scripts
sudo npm install -g npm-check-updates
```

### Start the services

Make sure there is an accessible instance of MongoDB (or run using Docker)

```sh
docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -d -p 27017:27017 mongo:latest
```

From the root of the repository:

```sh
npm start
```

Running the atlas requires starting 3 services:

- src/services/atlas-client
- src/services/atlas-api
- src/services/anyproxy

Running `npm start` will start these services in the same terminal window. It's useful to start these services individually for helpful log output (a terminal that allows for split screen is great for this).

To start these services individually:

```
cd src/services/atlas-client
npm start

cd src/services/atlas-api
npm start

cd src/services/anyproxy
npm start
```

# Deployment

All services in this repository are dockerized - see Dockerfiles located in the root of each package. Refer to the repository's [`docker-compose.yml`](/docker-compose.yml) file to see how to deploy all services together. By default, this repository supports continuous deployment (CD) using a self hosted GitHub actions-runner. This is easy to setup - once you have forked the repository follow the instructions provided by GitHub to install a self hosted actions runner on a Linux server (if Windows Server deployments are required please [request this](https://github.com/SAEONData/saeon-atlas/issues)). I.e. the process should be as simple as just 2 steps to get a deployment on every push to master:

1. Configure a self hosted GitHub actions runner on your server
2. Adjust the `.github/workflows/deploy-master.yml` to include configuration variables sensible for your environment (refer to the section on "Configuration" below)

NOTE - Docker images are built in the context of this repository, so the Dockerfiles for individual services are NOT the root context in which Docker is executed. This can be a bit confusing, the reason being to allow for commands running in docker containers to have access to the global babel configuration. For this reason, when building images with the `docker build` CLI, this command must be run from the root of this repository, with the path to the Dockerfile provided explicitly by the `--file , -f` options. For example:

```
docker build -t <image name> -f ./src/services/<service name>/Dockerfile .
```

#### Configuration

Build-time configuration essentially involves:

1. Creating `.env` files with appropriate values at the beginning of the build process (overwriting existing .env files)
2. Copying these `.env` files along with source code into the Docker build context, so that they are accessible during container runtime

This is achieved using GitHub actions software. The configuration is specified in the [workflow file](/.github/workflows/deploy-master.yml). Adjusting accordingly in repository forks and continuous deployment should (theoretically) work out the box if a self-hosted actions runner is configured on your server.

#### Docker Compose

To deploy this repository manually

```sh
# Clone the repo
git clone <...> saeon-atlas-fork

# Add configuration for docker-compose.yml scripts
echo "MONGO_USERNAME=<user>" > .env
echo "MONGO_PASSWORD=<pswd>" >> .env

# Build and run the images
docker-compose up -d --force-recreate --build
```

# NPM packages

To publish packages to the public NPM registry (where all the @saeon packages are published) you need to [create an NPM account](https://docs.npmjs.com/creating-a-new-npm-user-account). This allows you to publish the packages - you will also need to make sure that you are part of the @saeon organization. To publish these packages under new names you will need to fork the repository, and then update the `name` fields in all the `package.json` files.

Once you have an account you should be able to login via the CLI:

```sh
npm login
```

#### Publishing packages

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

# Code generators

#### Generate a React client
```sh
npm run generate-react-client
```

#### Generate an NPM package
```sh
npm run generate-npm-package
```