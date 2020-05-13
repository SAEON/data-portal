export default (snapZone, container) => {
  const containerHeight = container.offsetHeight - 85 // TODO
  const containerWidth = container.offsetWidth - 10 // TODO
  if (snapZone === 'Top' || snapZone === 'Left' || snapZone === 'TopLeft') return { x: 0, y: 0 }
  if (snapZone === 'Right' || snapZone === 'TopRight') return { x: containerWidth / 2 + 2.5, y: 0 } // TODO
  if (snapZone === 'Bottom' || snapZone === 'BottomLeft')
    return { x: 0, y: containerHeight / 2 + 2.5 } // TODO
  if (snapZone === 'BottomRight')
    return { x: containerWidth / 2 + 2.5, y: containerHeight / 2 + 2.5 } // TODO
  return null
}
