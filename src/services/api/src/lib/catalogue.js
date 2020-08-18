import packageJson from '../../package.json'
import fetch from 'node-fetch'

const errorHeader = `${packageJson.name} v${packageJson.version}`

export default function Catalogue({ dslAddress = null, index = null }) {
  if (!dslAddress || !index) {
    throw new Error(
      `${errorHeader}. class ElasticCatalogue. ERROR: Incorrect options param passed to constructor`
    )
  }
  this.httpClient = fetch
  this.dslAddress = dslAddress
  this.index = index
}

Catalogue.prototype.query = async function (dsl, abortFetch) {
  if (!dsl) {
    throw new Error(`${errorHeader}. DSL object is required to query the Elasticsearch instance`)
  } else {
    dsl = typeof dsl === 'string' ? JSON.parse(dsl) : dsl
  }

  try {
    const response = await this.httpClient(`${this.dslAddress}/${this.index}/_search`, {
      signal: abortFetch?.signal,
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dsl),
    })
    return await response.json()
  } catch (error) {
    if (error.name !== 'AbortError')
      throw new Error(
        `${errorHeader}. class ElasticCatalogue. ERROR: query failed with DSL body ${dsl}. ${error}`
      )
  }
}
