const packageJson = require('../../package.json')

export function Catalogue({
  dslAddress = null,
  index = null,
  httpClient = null,
  pageSize = 10,
} = {}) {
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
  this._matchClauses = []
  this._clauses = []
  this._filter = null
  this._source = null
  this._pageSize = pageSize
  this._currentPage = 0
}

Catalogue.prototype.addMatchClauses = function (...clauses) {
  this._matchClauses = [...clauses]
}

Catalogue.prototype.addClauses = function (...clauses) {
  this._clauses = [...clauses]
}

Catalogue.prototype.defineSource = function (source) {
  this._source = source
}

Catalogue.prototype.setFilter = function (filter) {
  this._filter = filter
}

Catalogue.prototype.getQuery = function () {
  const query = {
    _source: this._source,
    size: this._pageSize,
    from: this._currentPage * this._pageSize,
    query: {
      bool: {
        must: [
          ...this._matchClauses.map((m) => ({
            multi_match: m,
          })),
          ...this._clauses,
        ],
      },
    },
  }

  if (this._filter) query.query.bool.filter = this._filter
  return query
}

Catalogue.prototype.query = async function (query, abortFetch) {
  const self = this
  query = query
    ? typeof query === 'string'
      ? query
      : JSON.stringify(query)
    : JSON.stringify(this.getQuery())

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
    return {
      results: await await response.json(),
      next: function () {
        self._currentPage = self._currentPage + 1
        return self.query(null, abortFetch)
      },
    }
  } catch (error) {
    if (error.name !== 'AbortError')
      throw new Error(
        `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: query failed with DSL body ${query}. ${error}`
      )
  }
}

Catalogue.prototype.next = function () {
  this._currentPage = this._currentPage + 1
  return this.query()
}
