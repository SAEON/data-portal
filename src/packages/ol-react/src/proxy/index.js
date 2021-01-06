import { useState, useMemo } from 'react'
import mapProxy from './ol-map/index.js'

export default ({ map, children }) => {
  const [_, rerender] = useState(0)
  const proxy = useMemo(() => mapProxy({ map, rerender }), [map])

  return children({ proxy, render: _ })
}
