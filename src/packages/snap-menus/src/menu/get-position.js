export default (snapZone, PORTAL, GHOST_GUTTER_SIZE) => {
  const containerHeight = PORTAL.offsetHeight
  const containerWidth = PORTAL.offsetWidth

  if (snapZone === 'Top' || snapZone === 'Left' || snapZone === 'TopLeft') {
    return { x: 0, y: 0 }
  }

  if (snapZone === 'Right' || snapZone === 'TopRight') {
    return { x: containerWidth / 2 + GHOST_GUTTER_SIZE, y: 0 }
  }

  if (snapZone === 'Bottom' || snapZone === 'BottomLeft') {
    return { x: 0, y: containerHeight / 2 + GHOST_GUTTER_SIZE }
  }

  if (snapZone === 'BottomRight') {
    return { x: containerWidth / 2 + GHOST_GUTTER_SIZE, y: containerHeight / 2 + GHOST_GUTTER_SIZE }
  }

  return null
}
