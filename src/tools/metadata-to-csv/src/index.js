import stringify from 'csv-stringify'
import { createWriteStream } from 'fs'
import { join } from 'path'
import getCurrentDirectory from './get-current-directory.js'
import getDate from './get-date.js'

const INPUT_FILENAME = 'metadata-records.json'
const OUTPUT_FILENAME = `metadata-records-${getDate()}.csv`

const __dirname = getCurrentDirectory(import.meta)

const json = await import(join(__dirname, `../${INPUT_FILENAME}`)).then(({ default: json }) => json)

const stream = createWriteStream(join(__dirname, `../output/${OUTPUT_FILENAME}`))

stringify(
  json
    .map(({ metadata, ...fields }) => {
      return Object.assign(
        {},
        fields,
        Object.fromEntries(
          Object.entries(metadata).filter(([k]) => ['subjects', 'titles'].includes(k))
        )
      )
    })
    .map(
      ({ id, doi, subjects = [], titles = [], institution, collection, projects = [], schema }) => {
        return {
          id,
          doi,
          title: titles[0].title,
          uri: `https://catalogue.saeon.ac.za/records/${doi}`,
          subjects: subjects.map(({ subject }) => subject).join(','),
          institution,
          collection,
          projects: projects.join(','),
          schema,
        }
      }
    ),
  {
    header: true,
    delimiter: ',',
    quoted: false,
    quoted_empty: true,
    quote: '"',
    escape: '\\',
  }
).pipe(stream)
