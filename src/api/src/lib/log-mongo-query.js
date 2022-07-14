import { LOG_QUERY_DETAILS } from '../config/index.js'

export default (query, name = 'Mongo query') => {
  if (LOG_QUERY_DETAILS) {
    console.info('\n# Mongo query ::', name.toUpperCase(), JSON.stringify(query, null, 2), '\n')
  } else {
    console.info('# Mongo query ::', name.toUpperCase())
  }
}
