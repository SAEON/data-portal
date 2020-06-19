export default (snapZone, containerWidth, containerHeight) => {
  if (snapZone === 'Top') return { width: containerWidth, height: containerHeight }
  if (snapZone === 'Left' || snapZone === 'Right')
    return { width: containerWidth / 2 - 2.5, height: containerHeight } // TODO 2.5 is main app css
  if (
    snapZone === 'TopLeft' ||
    snapZone === 'TopRight' ||
    snapZone === 'BottomLeft' ||
    snapZone === 'BottomRight'
  )
    return { width: containerWidth / 2 - 2.5, height: containerHeight / 2 - 2.5 } // TODO
  if (snapZone === 'Bottom') return { width: containerWidth, height: containerHeight / 2 - 2.5 } // TODO
  return null
}
