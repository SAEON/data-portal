import packageJson from '../../package.json'

export default ev => {
  let x, y

  /**
   * Sometimes the event is a generalized class for some reason
   */
  x = ev.clientX
  y = ev.clientY

  /**
   * Otherwise the event is a MouseEvent or TouchEvent
   */
  if (!x || !y) {
    if (ev.constructor === MouseEvent) {
      x = ev.x
      y = ev.y
    } else if (ev.constructor === TouchEvent) {
      const { changedTouches } = ev
      const touch = changedTouches[0]
      x = touch.clientX
      y = touch.clientY
    } else {
      throw new Error(
        `${packageJson.name} v${packageJson.version} ERROR: Unrecognized event type. It's likely that not all possible touch/mouse events across different device types are parseed incorrectly`
      )
    }
  }

  return {
    x,
    y,
  }
}
