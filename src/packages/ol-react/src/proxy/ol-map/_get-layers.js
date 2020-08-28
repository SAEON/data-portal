import descriptor from '../../lib/proxy-descriptor'
import collectionProxy from '../ol-collection'

export default (map, rerender) => {
  return {
    ...descriptor,
    get: () => () => collectionProxy({ map, rerender }),
  }
}
