import descriptor from '../../lib/proxy-descriptor.js'

export default _self => {
  return {
    ...descriptor,
    get: () => id => _self.removeLayer(_self.getLayerById(id)),
  }
}
