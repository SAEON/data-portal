const packageJson = require('../../package.json')

export class Catalogue {
  constructor({ dslAddress = null, index = null, httpClient = null } = {}) {
    // Endpoint params are required
    if (!dslAddress || !index)
      throw new Error(
        `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: Incorrect options param passed to constructor`
      )

    // A fetch implementation is required
    this.httpClient = httpClient || fetch.bind(window)
    if (!this.httpClient)
      throw new Error(
        `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: the runtime environment requires an implementation of fetch. Please specify options.httpClient (that is compatible with windows.fetch in browsers)`
      )

    this.dslAddress = dslAddress
    this.index = index
  }

  async query(query, abortFetch) {
    query = typeof query === 'string' ? query : JSON.stringify(query)
    try {
      const uri = `${this.dslAddress}/${this.index}/_search`
      const response = await this.httpClient(uri, {
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
      if (error.name !== 'AbortError')
        throw new Error(
          `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: query failed with DSL body ${query}. ${error}`
        )
    }
  }
}
