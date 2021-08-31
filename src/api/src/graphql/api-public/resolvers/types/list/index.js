import { HOSTNAME } from '../../../../../config.js'

export default {
  id: async ({ _id }) => _id,
  title: async ({ collectionName }) => collectionName,
  url: async ({ _id, referrer }) => {
    return `${HOSTNAME}/list/records?search=${_id.toString()}&referrer=${referrer}&showSearchBar=true&disableSidebar=false`
  },
}
