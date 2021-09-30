import { HOSTNAME } from '../../../../../config/index.js'

export default {
  id: async ({ _id }) => _id,
  title: async ({ title, collectionName }) => title || collectionName,
  url: async ({ _id, referrer, showSearchBar = true, disableSidebar = true }) => {
    return `${HOSTNAME}/list/records?search=${_id.toString()}&referrer=${referrer}&showSearchBar=${showSearchBar}&disableSidebar=${disableSidebar}`
  },
}
