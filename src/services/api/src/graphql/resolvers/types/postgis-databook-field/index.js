import hash from 'object-hash'
const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  username: async self => self.username,
  password: async self => self.password,
  id: async self => hash(self),
  updateFieldName: await _import('./_update-field-name.js'),
}
