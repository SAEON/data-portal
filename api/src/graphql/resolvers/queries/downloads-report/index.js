import query from './_query.js'

export default async (self, { sort = { dimension: 'count', direction: 'DESC' } }, ctx, c) => {
  const selectionSet = c.fieldNodes
    .find(({ name }) => name.value === 'downloadsReport')
    .selectionSet.selections.map(({ name, arguments: args }) => {
      return { name, args }
    })

  const { Logs } = await ctx.mongo.collections
  const result = await Logs.aggregate(query(selectionSet, sort))

  return await result.toArray()
}
