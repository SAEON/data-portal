# @saeon/client

# Browser support

Builds are configured to support browsers with over 1% market share, excluding Internet Explorer, as configured in the [@saeon/client build](.browserslistrc). As of 11 May 2020, these include:

- chrome: 80
- edge: 18
- firefox: 74
- ios: 12.2
- safari: 13
- samsung: 11.1

# Quick start

The client needs an API - start an instance of the @saeon/api software to begin with. Then, from the root of the repository:

```sh
npm install
cd src/@saeon/client
npm install
npm start
```

# Deployment

#### Install global repository packages

```sh
npm ci --only=production
```

#### Install local packages

```sh
cd src/@saeon/client
npm ci --only=production
```

#### Build the application

Serving the web client involves setting up a webserver to serve static files. This is easiest to do via Nginx since the configuration required for Nginx is [included](/nginx) in this repository. The static files need to be built:

```sh
cd src/@saeon/api
npm run build # output is /dist, the entry point is /dist/index.html
```

#### Run as a Docker container

```sh
cd . # From the root of the repository
docker build -t client -f ./src/@saeon/api/Dockerfile .
docker run -p 3001:3001 -d client
```

#### Check that the application is working!

The client should be accessible at http://localhost:3001

## Configuration

Configuration can be passed to the build context via a `.env`:

```sh
cd src/services/client
touch .env
```
The full list of possible configuration options and default values is logged to the console in non-production environments. Then update values as required. 

```sh
# .env
CATALOGUE_API_ADDRESS=...
DEFAULT_ERROR=...
etc
```

### Filter configuration
The catalogue filters are defined via configuration, which is a JSON file. A [default configuration](default-filter-config.json) is included in the source. To update this, set the path to a new JSON configuration file in the `.env` file: `CATALOGUE_CLIENT_FILTER_CONFIG_PATH=/path/to/file.json` (Webpack reads the JSON at build time from this path). This is an example of a more advanced configuration that showcases all possible options:

```json
[
  {
    "title": "Keywords",
    "field": "subjects.subject.raw",
    "sortOrder": "desc",
    "sortBy": "doc_count",
    "path": "subjects",
    "filter": { "field": "subjects.subjectScheme.raw", "values": ["SANS1878 keywordType general"] }
  },
  {
    "title": "Places",
    "field": "subjects.subject.raw",
    "sortOrder": "desc",
    "sortBy": "doc_count",
    "path": "subjects",
    "filter": { "field": "subjects.subjectScheme.raw", "values": ["SANS1878 keywordType place"] }
  },
  {
    "title": "Themes",
    "field": "subjects.subject.raw",
    "sortOrder": "desc",
    "sortBy": "doc_count",
    "path": "subjects",
    "filter": { "field": "subjects.subjectScheme.raw", "values": ["SANS1878 keywordType theme"] }
  },
  {
    "title": "Stratums",
    "field": "subjects.subject.raw",
    "sortOrder": "desc",
    "sortBy": "doc_count",
    "path": "subjects",
    "filter": { "field": "subjects.subjectScheme.raw", "values": ["SANS1878 keywordType stratum"] }
  },
  { "title": "Publication Year", "field": "publicationYear", "sortOrder": "desc" },
  { "title": "Publisher", "field": "publisher.raw" },
  { "title": "Creators", "field": "creators.name.raw", "path": "creators" }
]
```

## Docker deployment

```
docker build -t client -f ./src/services/client/Dockerfile .
```
