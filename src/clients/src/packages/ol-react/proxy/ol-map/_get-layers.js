import descriptor from '../../lib/proxy-descriptor.js'
import collectionProxy from '../ol-collection/index.js'

export default (map, rerender) => {
  return {
    ...descriptor,
    get: () => () => collectionProxy({ map, rerender }),
  }
}
