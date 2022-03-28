import descriptor from '../../lib/proxy-descriptor.js'

export default (map, rerender) => {
  return {
    ...descriptor,
    get: () => layer => {
      map.removeLayer(layer) || map.removeLayer(layer._self)
      rerender(r => r + 1)
    }
  }
}
