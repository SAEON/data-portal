import { insertList } from './db.js'
import { spreadsheetId, range, CONNECTION_STRING } from './config.js'
import { getValues } from './sheets.js'

const CATALOGUE_CLIENT_HOST = CONNECTION_STRING.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://catalogue.saeon.ac.za'

/**
 * The res is actually a network response
 * { headers, data, etc. }
 **/
const { data } = await getValues(spreadsheetId, range)

/**
 * HEADER ORDER IMPORTANT!!!!
 *
 * slice(1) discards the headers
 * for the purposes of this function
 */
const rows = data.values.slice(1)
const successes = []
const errors = []

for (const row of rows) {
  const [collectionName, , version] = row
  try {
    const savedList = await insertList(...row)
    const id = savedList.value?._id || savedList.lastErrorObject.upserted
    successes.push(
      `${collectionName} ~ ${CATALOGUE_CLIENT_HOST}/render/records?disableSidebar=true&search=${id}&showSearchBar=true`
    )
  } catch (error) {
    errors.push(`${collectionName}-v${version}`)
  }
}

console.log('SUCCESSFUL UPDATES', '\n')
console.log(successes.join('\n'))
console.log('\n\n')

if (errors.length) {
  console.log('FAILED UPDATES', '\n')
  console.log(errors.join('\n'))
}

process.exit(0)
