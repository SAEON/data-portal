import '@saeon/logger'
import './lib/native-extensions.js'
import './lib/log-config.js'
import { createServer } from 'http'
import apolloServers from './graphql/index.js'
import './postgis/setup.js'
import {
  API_BIND_PORT_PUBLIC,
  API_BIND_PORT_INTERNAL,
  SERVER_TASKS,
  ENABLE_METADATA,
  METADATA_INTEGRATION_SCHEDULE,
} from './config/index.js'
import { Task } from './lib/task-manager/index.js'
import loadMetadataRecords from './integrations/metadata/index.js'
import configurePublicHttpApi from './app/public-api.js'
import configureInternalHttpApi from './app/internal-api.js'

const publicApp = configurePublicHttpApi()
const internalApp = configureInternalHttpApi()

/**
 * Metadata integration
 * Pull metadata into Elasticsearch
 */
if (ENABLE_METADATA) {
  console.info('Metadata enabled!')
  SERVER_TASKS.addTask(
    new Task(
      { schedule: METADATA_INTEGRATION_SCHEDULE, id: 'Metadata integration' },
      loadMetadataRecords
    )
  )
} else {
  console.info('Metadata disabled')
}

// Configure HTTP servers
const publicHttpServer = createServer(publicApp.callback())
const privateHttpServer = createServer(internalApp.callback())

// Configure Apollo servers
const { publicServer: publicGqlServer, internalServer: internalGqlServer } = apolloServers
publicGqlServer.start().then(() => publicGqlServer.applyMiddleware({ app: publicApp, cors: false }))
internalGqlServer
  .start()
  .then(() => internalGqlServer.applyMiddleware({ app: internalApp, cors: false }))

// Start public HTTP server
publicHttpServer.listen(API_BIND_PORT_PUBLIC, () => {
  console.log(`@saeon/catalogue API server ready`)
  console.log(`@saeon/catalogue GraphQL server ready`)
})

// Start internal HTTP server
privateHttpServer.listen(API_BIND_PORT_INTERNAL, () => {
  console.log(`@saeon/catalogue API server ready (internal)`)
  console.log(`@saeon/catalogue GraphQL server ready (internal)`)
})
