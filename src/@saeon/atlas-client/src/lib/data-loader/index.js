/**
 * Inspired by the dataloader library
 * https://www.npmjs.com/package/dataloader
 */
export default class DataLoader {
  constructor(_batchLoadingFn) {
    this._timer
    this._keys = []
    this._batchLoadingFn = _batchLoadingFn
  }

  load(key) {
    clearTimeout(this._timer)
    const promisedValue = new Promise((resolve) => this._keys.push({ key, resolve }))
    this._timer = setTimeout(() => {
      this._batchLoadingFn(this._keys.map((k) => k.key)).then((values) => {
        this._keys.forEach(({ resolve }, i) => {
          resolve(values[i])
        })
        this._keys = []
      })
    }, 0)
    return promisedValue
  }
}
