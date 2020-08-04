export default (snapZone, PORTAL, GHOST_GUTTER_SIZE) => {
  const containerHeight = PORTAL.offsetHeight
  const containerWidth = PORTAL.offsetWidth

  if (snapZone === 'Top') {
    return { width: containerWidth, height: containerHeight }
  }

  if (snapZone === 'Left' || snapZone === 'Right') {
    return { width: containerWidth / 2 - GHOST_GUTTER_SIZE, height: containerHeight }
  }

  if (
    snapZone === 'TopLeft' ||
    snapZone === 'TopRight' ||
    snapZone === 'BottomLeft' ||
    snapZone === 'BottomRight'
  ) {
    return {
      width: containerWidth / 2 - GHOST_GUTTER_SIZE,
      height: containerHeight / 2 - GHOST_GUTTER_SIZE,
    }
  }

  if (snapZone === 'Bottom') {
    return { width: containerWidth, height: containerHeight / 2 - GHOST_GUTTER_SIZE }
  }

  return null
}
