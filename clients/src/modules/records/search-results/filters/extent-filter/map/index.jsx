import { useEffect, useMemo, useRef } from 'react'
import { esriBasemap } from '../../../../../../lib/ol'
import Controls from './_controls'
import MapAttribution from '../../../../../../components/map-attribution'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import LayerGroup from 'ol/layer/Group'
import { Div } from '../../../../../../components/html-tags'

export default () => {
  const ref = useRef()

  const map = useMemo(
    () =>
      new Map({
        layers: new LayerGroup({
          layers: [esriBasemap()],
        }),
        controls: defaultControls({
          zoom: false,
          rotateOptions: false,
          rotate: false,
          attribution: false,
        }),
        view: new View({
          center: [26, -25],
          zoom: 4,
          projection: 'EPSG:4326',
        }),
      }),
    []
  )

  useEffect(() => {
    map.setTarget(ref.current)
  }, [map])

  return (
    <Div ref={ref} sx={{ height: 300, position: 'relative' }}>
      <Controls map={map} />
      <MapAttribution />
    </Div>
  )
}
