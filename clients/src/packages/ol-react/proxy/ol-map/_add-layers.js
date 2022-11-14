import descriptor from '../../lib/proxy-descriptor.js'
import LayerGroup from 'ol/layer/Group.js'

export default (map, rerender) => {
  return {
    ...descriptor,
    get: () => layers => {
      for (let layer of layers) {
        if (
          map
            .getLayers()
            .getArray()
            .map(layer => layer.get('id'))
            .includes(layer.get('id'))
        ) {
          throw new Error(
            `ERROR: Cannot add layer with ID ${layer.get(
              'id'
            )} to the map since a layer with that ID already exists`
          )
        } else {
          map.setLayerGroup(
            new LayerGroup({
              layers: [layer, ...map.getLayerGroup().getLayers().getArray()].map(
                (layer, i, arr) => {
                  layer.setZIndex(arr.length - i)
                  return layer
                }
              ),
            })
          )
        }
      }

      rerender(r => r + 1)
    },
  }
}
