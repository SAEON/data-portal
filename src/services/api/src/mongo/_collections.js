export default ({ db, _collections }) =>
  Object.entries(_collections)
    .reduce(async (acc, [alias, name]) => {
      const accum = await acc
      accum[alias] = (await db).collection(name)
      return accum
    }, Promise.resolve({}))
    .catch(error => console.error('Unable to load MongoDB collections', error))
