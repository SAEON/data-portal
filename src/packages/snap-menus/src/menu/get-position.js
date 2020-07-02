export default (snapZone, containerWidth, containerHeight, HORIZONTAL_MARGIN) => {
  const m = HORIZONTAL_MARGIN / 2
  if (snapZone === 'Top' || snapZone === 'Left' || snapZone === 'TopLeft') return { x: 0, y: 0 }
  if (snapZone === 'Right' || snapZone === 'TopRight') return { x: containerWidth / 2 + m, y: 0 }
  if (snapZone === 'Bottom' || snapZone === 'BottomLeft')
    return { x: 0, y: containerHeight / 2 + m }
  if (snapZone === 'BottomRight') return { x: containerWidth / 2 + m, y: containerHeight / 2 + m }
  return null
}
