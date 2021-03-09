import { insertList } from './db.js'
import { spreadsheetId, range } from './config.js'
import { getValues } from './sheets.js'

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

for (const row of rows) {
  const [collectionName] = row
  const savedList = await insertList(...row)
  const id = savedList.value?._id || savedList.lastErrorObject.upserted
  console.log(
    collectionName,
    `https://catalogue.saeon.ac.za/render/records?disableSidebar=true&search=${id}&showSearchBar=false`
  )
}

process.exit(0)
