import descriptor from '../../lib/proxy-descriptor'

export default _self => {
  return {
    ...descriptor,
    get: () => layer => _self.addLayers([layer]),
  }
}
