export default (snapZone, containerWidth, containerHeight, HORIZONTAL_MARGIN) => {
  const m = HORIZONTAL_MARGIN / 2
  if (snapZone === 'Top') return { width: containerWidth, height: containerHeight }
  if (snapZone === 'Left' || snapZone === 'Right')
    return { width: containerWidth / 2 - m, height: containerHeight }
  if (
    snapZone === 'TopLeft' ||
    snapZone === 'TopRight' ||
    snapZone === 'BottomLeft' ||
    snapZone === 'BottomRight'
  )
    return { width: containerWidth / 2 - m, height: containerHeight / 2 - m}
  if (snapZone === 'Bottom') return { width: containerWidth, height: containerHeight / 2 - m}
  return null
}
