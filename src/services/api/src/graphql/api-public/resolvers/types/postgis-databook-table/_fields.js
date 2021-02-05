export default async (self, args) => {
  const { id } = args
  var fields = id ? self.fields.filter(field => field.column_name === id) : self.fields
  fields.map(field => (field.databook = self.databook))
  return fields
}
