/**
 * Inspired by the dataloader library
 * https://www.npmjs.com/package/dataloader
 */

export default class {
  constructor(_batchLoadingFn) {
    this._timer
    this._keys = []
    this._batchLoadingFn = _batchLoadingFn
    this._interval = 2 * 1000
  }

  load(key) {
    clearTimeout(this._timer)
    const promisedValue = new Promise((resolve) => this._keys.push({ key, resolve }))
    this._timer = setTimeout(() => {
      try {
        this._batchLoadingFn(this._keys.map((k) => k.key)).then((values) => {
          this._keys.forEach(({ resolve }, i) => {
            resolve(values[i])
          })
          this._keys = []
        })
      } catch (error) {
        console.error('Unable to log to remote server', error)
        this._keys = []
      }
    }, this._interval)
    return promisedValue
  }
}
