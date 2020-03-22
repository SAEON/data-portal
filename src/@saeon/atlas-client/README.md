# @saeon/atlas-client

From the root of the repository (`/atlas`)

```
npm install
npm start
```

## Configuration

Add a `.env` file to `src/@saeon/atlas-client`. And configure as required. Default values are shown:

```
ATLAS_API_ADDRESS=http://localhost:4000
```

## Docker deployment

```
docker build -t atlas-client -f ./src/@saeon/atlas-client/Dockerfile .
```
