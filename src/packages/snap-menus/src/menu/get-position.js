export default (snapZone, containerWidth, containerHeight) => {
  if (snapZone === 'Top' || snapZone === 'Left' || snapZone === 'TopLeft') return { x: 0, y: 0 }
  if (snapZone === 'Right' || snapZone === 'TopRight') return { x: containerWidth / 2, y: 0 }
  if (snapZone === 'Bottom' || snapZone === 'BottomLeft') return { x: 0, y: containerHeight / 2 }
  if (snapZone === 'BottomRight') return { x: containerWidth / 2, y: containerHeight / 2 }
  return null
}
