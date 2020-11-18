import hash from 'object-hash'

export default async (self, args) => {
  console.log('_fields self', self)
  const { id } = args
  return id ? self.fields.filter(field => hash(field) === id) : self.fields
}
