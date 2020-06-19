export default (snapZone, containerWidth, containerHeight) => {
  if (snapZone === 'Top' || snapZone === 'Left' || snapZone === 'TopLeft') return { x: 0, y: 0 }
  if (snapZone === 'Right' || snapZone === 'TopRight') return { x: containerWidth / 2 + 2.5, y: 0 } // TODO 2.5 is related to main app decisions
  if (snapZone === 'Bottom' || snapZone === 'BottomLeft')
    return { x: 0, y: containerHeight / 2 + 2.5 } // TODO
  if (snapZone === 'BottomRight')
    return { x: containerWidth / 2 + 2.5, y: containerHeight / 2 + 2.5 } // TODO
  return null
}
