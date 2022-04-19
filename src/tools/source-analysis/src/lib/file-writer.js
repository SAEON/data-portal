import stringify from 'csv-stringify'
import format from 'date-fns/format/index.js'
import { OUTPUT_FILEPATH } from '../config.js'
import { createWriteStream } from 'fs'
import ensureDirectory from './ensure-directory.js'

// Open the path for writing
const stream = createWriteStream(OUTPUT_FILEPATH)

export default () => {
  // Ensure the output path exists
  ensureDirectory(OUTPUT_FILEPATH)

  var header = true
  return {
    setIncludeHeaderRow: val => {
      header = val
    },
    writeToFile: ({ data, filter, mapProperties }) => {
      stringify(
        data
          .map(({ node }) => node)
          .filter(filter)
          .map(mapProperties),
        {
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
        }
      ).pipe(stream, {
        end: false,
      })
    },
  }
}
