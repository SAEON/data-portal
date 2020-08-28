import descriptor from '../../lib/proxy-descriptor'

export default map => {
  return {
    ...descriptor,
    get: () => id =>
      map
        .getLayers() // TODO - I think this should be proxy.getLayers
        .getArray()
        .filter(layer => id === layer.get('id'))[0],
  }
}
