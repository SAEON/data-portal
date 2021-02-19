import { CATALOGUE_CLIENT_MAX_ATLAS_LAYERS } from '../../../../../../config'

export default (selectedIds, cache, selectAll, atlasLayersCount) => {
  if (selectAll) {
    if (atlasLayersCount > CATALOGUE_CLIENT_MAX_ATLAS_LAYERS) {
      return `Too many datasets for atlas - search returns ${atlasLayersCount} maps. Max. ${CATALOGUE_CLIENT_MAX_ATLAS_LAYERS}`
    } else {
      return `Configure atlas from ${
        selectedIds?.filter(id => cache[id]).length || atlasLayersCount
      } mappable search results`
    }
  } else {
    if (selectedIds.length) {
      const n = selectedIds?.filter(id => cache[id]).length
      if (n) {
        return `Configure atlas from ${n} mappable search results`
      } else {
        return 'No maps found for selected records'
      }
    } else {
      return 'Show atlas from 0 selected records'
    }
  }
}
