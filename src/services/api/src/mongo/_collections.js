export default ({ db, _collections }) =>
  Object.entries(_collections)
    .reduce(async (accumulator, [alias, name]) => {
      const _accumulator = await accumulator
      _accumulator[alias] = (await db).collection(name)
      return _accumulator
    }, Promise.resolve({}))
    .catch(error => console.error('Unable to load MongoDB collections', error))
