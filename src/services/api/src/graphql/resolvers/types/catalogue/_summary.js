export default async (_, args, ctx) => {
  const { catalogue } = ctx
  const { fields, filterBySubjects: subjects, limit } = args
  const result = await catalogue.countPivotOn({ fields, subjects, limit })
  return result
}
