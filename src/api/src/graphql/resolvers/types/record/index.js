import citation from './_citation.js'

export default {
  id: async self => self._id,
  metadata: async self => self,
  citation
}
