import { HOSTNAME } from '../../../../../config.js'

export default {
  id: async ({ _id }) => _id,
  title: async ({ collectionName }) => collectionName,
  url: async ({ _id, referrer, showSearchBar = true, disableSidebar = true }) => {
    return `${HOSTNAME}/list/records?search=${_id.toString()}&referrer=${referrer}&showSearchBar=${showSearchBar}&disableSidebar=${disableSidebar}`
  },
}
