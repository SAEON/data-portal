const BATCH_SIZE = 1000

export default collections => {
  return class LogBatcher {
    constructor() {
      this._timer
      this._queries = []
    }

    load(...queries) {
      clearTimeout(this._timer)
      this._queries.push(...queries)
      this._timer = setTimeout(async () => {
        try {
          const { Logs } = await collections
          const { insertedCount } = await Logs.insertMany(this._queries.slice(0, BATCH_SIZE))
          console.log('Client events logged', insertedCount)
          this._queries = this._queries.slice(BATCH_SIZE)
          if (this._queries.length) {
            this.load()
          }
        } catch (error) {
          console.error(
            'Error logging client events to Mongo (ignore this unless very frequent).',
            error.message
          )
        }
      }, 0)
    }
  }
}
