import query from './query.js'

export default async (self, args, ctx, c) => {
  const selectionSet = c.fieldNodes
    .find(({ name }) => name.value === 'downloadsReport')
    .selectionSet.selections.map(({ name, arguments: args }) => {
      return { name, args }
    })

  const { Logs } = await ctx.mongo.collections
  const result = await Logs.aggregate(query(selectionSet))

  return await result.toArray()
}
