import fetch from 'node-fetch'
import {writeFileSync} from 'fs'

const {hits} = await fetch('http://192.168.116.66:9200/saeon-odp-4-2/_search').then(res => res.json())
const results = hits.hits

const data = results.map(({_source}) => Object.fromEntries(
  Object.entries(
    _source.metadata_json
  )
    .filter(([k]) => k !== 'originalMetadata')
))

writeFileSync('./metadata-records.json', JSON.stringify(data, null, 2), {
  encoding: 'utf-8'
})

