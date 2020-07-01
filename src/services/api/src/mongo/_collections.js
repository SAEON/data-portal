export default ({ db, _collections }) => {
  return Object.entries(_collections).reduce(async (acc, [alias, name]) => {
    const accum = await acc
    accum[alias] = (await db).collection(name)
    return accum
  }, Promise.resolve({}))
}
