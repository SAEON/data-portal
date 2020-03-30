const packageJson = require('../package.json')

export class ElasticCatalogue {
  constructor({ dslAddress = null } = {}) {
    if (!dslAddress)
      throw new Error(
        `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: Incorrect options param passed to constructor`
      )
    this.dslAddress = dslAddress
  }

  async query(body) {
    body = typeof body === 'string' ? body : JSON.stringify(body)
    try {
      const response = await fetch(this.dslAddress, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      })
      return await response.json()
    } catch (error) {
      throw new Error(
        `${packageJson.name} v${packageJson.version}. class ElasticCatalogue. ERROR: query failed with DSL body ${body}. ${error}`
      )
    }
  }
}
