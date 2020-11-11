import hash from 'object-hash'

export default async (self, args) => {
  const { id } = args
  return id ? self.fields.filter(field => hash(field) === id) : self.fields
}
