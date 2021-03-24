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
console.info('Reading spreadsheet')
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

console.info('Loading rows into Mongo')
for (const row of rows) {
  const [collectionName, , version] = row
  const hashedSearch = `${collectionName}-v${version}`

  try {
    const savedList = await insertList(...row)
    const id = savedList.value?._id || savedList.lastErrorObject.upserted
    successes.push(
      `${collectionName} ~ ${CATALOGUE_CLIENT_HOST}/render/records?search=${id}&showSearchBar=true&disableSidebar=false&referrer=${hashedSearch}`
    )
  } catch (error) {
    errors.push({ hashedSearch, error })
  }
}

console.log('SUCCESSFUL UPDATES', '\n')
console.log(successes.join('\n'))
console.log('\n\n')

if (errors.length) {
  console.log('FAILED UPDATES', '\n')
  console.log(errors)
}

process.exit(0)
