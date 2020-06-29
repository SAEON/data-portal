import stringify from 'csv-stringify'
import format from 'date-fns/format/index.js'
import { OUTPUT_FILEPATH } from '../config.js'
import { createWriteStream } from 'fs'

const stream = createWriteStream(OUTPUT_FILEPATH)

export default () => {
  var header = true
  return {
    setIncludeHeaderRow: val => {
      header = val
    },
    writeToFile: json => {
      stringify(json, {
        header,
        delimiter: ',',
        quoted: true,
        quoted_empty: true,
        quote: '"',
        escape: '\n',
        cast: {
          string: (value, { column }) => {
            if (column === 'committer.date') {
              return format(new Date(value), 'yyyy-MM-dd')
            }
            return value
          },
        },
        columns: [
          {
            key: 'committer.date',
          },
          'committer.name',
          'oid',
          'changedFiles',
          'deletions',
          'commitUrl',
          'message',
          'issue#',
        ],
      }).pipe(stream, {
        end: false,
      })
    },
  }
}
