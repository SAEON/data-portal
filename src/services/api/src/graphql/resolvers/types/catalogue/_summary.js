export default async (_, args, ctx) => {
  const { catalogue } = ctx
  const { fields, filterByTerms: terms, limit } = args
  const result = await catalogue.countPivotOn({ fields, terms, limit })
  return result
}
