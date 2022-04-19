import descriptor from '../../lib/proxy-descriptor.js'

export default _self => {
  return {
    ...descriptor,
    get: () => layer => _self.addLayers([layer]),
  }
}
