const packageJson = require('../../package.json')

export class Catalogue {
  constructor({ dslAddress = null, index = null } = {}) {
    if (!dslAddress || !index)
      throw new Error(
        `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: Incorrect options param passed to constructor`
      )
    this.dslAddress = dslAddress
    this.index = index
  }

  async query(query, abortFetch) {
    query = typeof query === 'string' ? query : JSON.stringify(query)
    try {
      const response = await fetch(`${this.dslAddress}?index=${this.index}`, {
        signal: abortFetch?.signal,
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: query,
      })
      return await response.json()
    } catch (error) {
      throw new Error(
        `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: query failed with DSL body ${query}. ${error}`
      )
    }
  }
}
