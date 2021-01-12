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

Catalogue.prototype.query = async function (dsl) {
  if (!dsl) {
    throw new Error(`${errorHeader}. DSL object is required to query the Elasticsearch instance`)
  } else {
    dsl = typeof dsl === 'string' ? JSON.parse(dsl) : dsl
  }

  try {
    return await this.httpClient(`${this.dslAddress}/${this.index}/_search`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dsl),
    }).then(res => res.json())
  } catch (error) {
    throw new Error(
      `${errorHeader}. class ElasticCatalogue. ERROR: query failed with DSL body ${JSON.stringify(
        dsl
      )}. ${error}`
    )
  }
}
