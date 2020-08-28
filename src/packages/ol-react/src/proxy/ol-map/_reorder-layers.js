import descriptor from '../../lib/proxy-descriptor'
import LayerGroup from 'ol/layer/Group'

export default (map, rerender) => {
  return {
    ...descriptor,
    get: () => (startIndex, endIndex) => {
      const layers = Array.from(map.getLayers().getArray())
      const [removed] = layers.splice(startIndex, 1)
      layers.splice(endIndex, 0, removed)
      map.setLayerGroup(
        new LayerGroup({
          layers: layers.map((layer, i, arr) => {
            layer.setZIndex(arr.length - i)
            return layer
          }),
        })
      )
      rerender(r => r + 1)
    },
  }
}
