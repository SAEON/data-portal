import hash from 'object-hash'

export default async (self, args) => {
  const { id } = args
  const { username, password } = self.databook.authentication
  // console.log('self', self)
  var fields = id ? self.fields.filter(field => hash(field) === id) : self.fields
  // fields.map(field => (field.databook = self.databook))
  // fields.map(field => {
  //   field.username = username
  //   field.password = password
  //   // return field
  // })
  // console.log('fields', fields)
  return fields
}
