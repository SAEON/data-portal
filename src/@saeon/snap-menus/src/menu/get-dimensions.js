export default (snapZone, container) => {
  const containerHeight = container.offsetHeight - 85 // TODO - this comes from CSS in the main package
  const containerWidth = container.offsetWidth - 10 // TODO
  if (snapZone === 'Top') return { width: containerWidth, height: containerHeight }
  if (snapZone === 'Left' || snapZone === 'Right')
    return { width: containerWidth / 2 - 2.5, height: containerHeight } // TODO
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
