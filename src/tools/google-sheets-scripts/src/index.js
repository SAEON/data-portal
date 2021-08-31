import { spreadsheetId, range } from './config.js'
import { getValues } from './sheets.js'

/**
 * The res is actually a network response
 * { headers, data, etc. }
 **/
console.info('Reading spreadsheet')
const { data } = await getValues(spreadsheetId, range)

console.log('Spreadsheet data', data)

process.exit(0)
