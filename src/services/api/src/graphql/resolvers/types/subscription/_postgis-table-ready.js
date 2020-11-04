import pubsub, { POSTGIS_TABLE_EXISTS } from '../../../pubsub.js'

/**
 * (1) Check if a table with some kind of provided ID exists
 * (2) If that table does exist
 *  => check that this table isn't currently being created
 *  => If it's not currently being created, trigger the subscription
 * (3) If that table doesn't then an event will be fired later
 */
export default {
  subscribe: () => pubsub.asyncIterator([POSTGIS_TABLE_EXISTS]),
}
