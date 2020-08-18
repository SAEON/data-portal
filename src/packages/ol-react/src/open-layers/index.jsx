import React, { useRef, useLayoutEffect, useMemo } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import LayerGroup from 'ol/layer/Group'

export default ({ layers, viewOptions, children, style, className }) => {
  const mapDomRef = useRef(null)

  const map = useMemo(() => {
    return new Map({
      layers: new LayerGroup({
        layers: [...layers].map((layer, i, arr) => {
          layer.setZIndex(arr.length - i)
          return layer
        }),
      }),
      controls: defaultControls({
        zoom: false,
        rotateOptions: false,
        rotate: false,
        attribution: false,
      }).extend([]),
      view: new View(
        Object.assign(
          {
            center: [0, 0],
            zoom: 3,
            projection: 'EPSG:4326',
          },
          viewOptions || {}
        )
      ),
    })
  }, [])

  useLayoutEffect(() => {
    map.setTarget(mapDomRef.current)
  }, [map])

  return (
    <>
      <div className={className} ref={mapDomRef} style={style} />
      {children ? children({ map }) : null}
    </>
  )
}
