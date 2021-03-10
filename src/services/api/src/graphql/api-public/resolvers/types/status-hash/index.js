import hash from 'object-hash'

export default {
  id: async self => hash(self),
}
