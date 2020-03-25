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
    const response = await fetch(this.dslAddress, {
      method: 'POST',
      body
    })
    const txt = await response.text()
    console.log(response, txt)
    return []
  }
}
