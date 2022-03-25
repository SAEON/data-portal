import { MONGO_DB_PASSWORD } from '../../../src/config/index.js'

export default () => {
  return `
sdp :: tasks :: list
... this is a test to see if the production env is accessible
${MONGO_DB_PASSWORD}`
}