import hash from 'object-hash'
const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  id: async self => {
    console.log('weird self', self)
    return hash(self)
  },
  updateFieldName: await _import('./_update-field-name.js'),
}
