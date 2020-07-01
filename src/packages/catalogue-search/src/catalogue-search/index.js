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
        ...this._matchClauses.map(m => ({
          multi_match: m,
        })),
      ]

    if (this._clauses) dsl.query.bool.must = [...dsl.query.bool.must, ...this._clauses]

    if (this._filter) dsl.query.bool.filter = this._filter

    return dsl
  }

  async getDataThemes() {
    const dsl = `
      {
        "_source": false,
        "aggs": {
          "subjects": {
            "terms": {
              "field": "metadata_json.subjects.subject.raw",
              "size": 10000
            }
          }
        }
      }`

    const result = await this.query(dsl)
    return result?.aggregations.subjects.buckets
  }

  async getSingleRecord(id) {
    const dsl = `
      {
        "size": 10,
        "from": 0,
        "query": {
          "multi_match": {
            "query": "${id}",
            "fields": [
              "metadata_json.alternateIdentifiers.alternateIdentifier"
            ]
          }
        },
        "_source": {
          "includes": [
            "metadata_json.*"
          ]
        }
      }`

    const result = await this.query(dsl)
    return result?.hits.hits?.[0]?._source.metadata_json
  }

  async query(dsl, abortFetch) {
    dsl = dsl
      ? typeof dsl === 'string'
        ? dsl
        : JSON.stringify(dsl)
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
        body: dsl,
      })
      return await response.json()
    } catch (error) {
      if (error.name !== 'AbortError')
        throw new Error(
          `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: query failed with DSL body ${dsl}. ${error}`
        )
    }
  }
}
