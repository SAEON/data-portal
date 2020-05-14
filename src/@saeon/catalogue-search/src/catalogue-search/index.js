const packageJson = require('../../package.json')

export class Catalogue {
  constructor({ dslAddress = null, index = null, httpClient = null, pageSize = 10 } = {}) {
    // Endpoint params are required
    if (!dslAddress || !index)
      throw new Error(
        `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: Incorrect options param passed to constructor`
      )

    // A fetch implementation is required
    this.httpClient = httpClient || fetch?.bind(window)
    if (!this.httpClient)
      throw new Error(
        `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: the runtime environment requires an implementation of fetch. Please specify options.httpClient (that is compatible with windows.fetch in browsers)`
      )

    this.dslAddress = dslAddress
    this.index = index
    this._matchClauses = null
    this._clauses = null
    this._filter = null
    this._source = null
    this._pageSize = pageSize
    this._currentPage = 0
  }

  addMatchClauses(...clauses) {
    this._matchClauses = [...clauses]
  }

  addClauses(...clauses) {
    this._clauses = [...clauses]
  }

  defineSource(source) {
    this._source = source
  }

  setFilter(filter) {
    this._filter = filter
  }

  getQuery() {
    const dsl = {
      size: this._pageSize,
      from: this._currentPage * this._pageSize,
      query: {
        bool: {
          must: [],
        },
      },
    }

    if (this._source) dsl._source = this._source

    if (this._matchClauses)
      dsl.query.bool.must = [
        ...dsl.query.bool.must,
        ...this._matchClauses.map((m) => ({
          multi_match: m,
        })),
      ]

    if (this._clauses) dsl.query.bool.must = [...dsl.query.bool.must, ...this._clauses]

    if (this._filter) dsl.query.bool.filter = this._filter

    return dsl
  }

  async query(query, abortFetch) {
    query = query
      ? typeof query === 'string'
        ? query
        : JSON.stringify(query)
      : JSON.stringify(this.getQuery())

    try {
      const response = await this.httpClient(`${this.dslAddress}/${this.index}/_search`, {
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
