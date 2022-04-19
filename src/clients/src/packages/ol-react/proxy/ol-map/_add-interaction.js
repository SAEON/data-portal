import descriptor from '../../lib/proxy-descriptor.js'

export default (map, rerender) => {
  return {
    ...descriptor,
    get: () => interaction => {
      map.addInteraction(interaction)
      rerender(r => r + 1)
    },
  }
}
