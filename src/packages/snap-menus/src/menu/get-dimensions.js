export default (snapZone, containerWidth, containerHeight) => {
  if (snapZone === 'Top') return { width: containerWidth, height: containerHeight }
  if (snapZone === 'Left' || snapZone === 'Right')
    return { width: containerWidth / 2, height: containerHeight }
  if (
    snapZone === 'TopLeft' ||
    snapZone === 'TopRight' ||
    snapZone === 'BottomLeft' ||
    snapZone === 'BottomRight'
  )
    return { width: containerWidth / 2, height: containerHeight / 2 }
  if (snapZone === 'Bottom') return { width: containerWidth, height: containerHeight / 2 }
  return null
}
