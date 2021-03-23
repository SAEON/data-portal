import offset from '../../lib/offset.js'

const SNAP_ZONE_X = 25
const SNAP_ZONE_Y = 25

export default (x, y, PORTAL) => {
  const height = PORTAL.offsetHeight
  const width = PORTAL.offsetWidth
  const yOffset = offset(PORTAL).top
  const xOffset = offset(PORTAL).left

  const snapTop = y <= SNAP_ZONE_Y + yOffset ? true : false
  const snapBottom = y >= height - SNAP_ZONE_Y + yOffset ? true : false
  const snapLeft = x <= SNAP_ZONE_X + xOffset ? true : false
  const snapRight = x >= width - SNAP_ZONE_X + xOffset ? true : false

  let snapZone = null

  if (snapLeft && snapTop) {
    snapZone = 'TopLeft'
  } else if (snapRight && snapTop) {
    snapZone = 'TopRight'
  } else if (snapLeft && snapBottom) {
    snapZone = 'BottomLeft'
  } else if (snapRight && snapBottom) {
    snapZone = 'BottomRight'
  } else if (snapTop) {
    snapZone = 'Top'
  } else if (snapLeft) {
    snapZone = 'Left'
  } else if (snapRight) {
    snapZone = 'Right'
  } else if (snapBottom) {
    snapZone = 'Bottom'
  }

  return snapZone
}
