import citation from './_citation.js'
import downloadCount from './_download-count.js'

export default {
  id: async self => self._id,
  metadata: async self => self,
  citation,
  downloadCount,
}
