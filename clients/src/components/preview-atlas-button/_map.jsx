import { useEffect, useState, useRef, useMemo } from 'react'
import Polygon from 'ol/geom/Polygon'
import Point from 'ol/geom/Point'
import WKT from 'ol/format/WKT'
import Loading from '../loading'
import { esriBasemap, createLayer, LayerTypes } from '../../lib/ol/layers'
import { PROXY_ADDRESS } from '../../config'
import DialogContent from '@mui/material/DialogContent'
import { Pre, Div } from '../html-tags'
import MapAttribution from '../map-attribution'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import LayerGroup from 'ol/layer/Group'

const wkt = new WKT()

const SPATIALDATA_PROXY = `${PROXY_ADDRESS}/saeon-spatialdata`

const EXTENT_PADDING = 3

export default ({ geoLocations, linkedResource, id, title }) => {
  const ref = useRef()
  const { resourceURL = '' } = linkedResource
  const [uriInspection, setUriInspection] = useState({ error: undefined, loading: true })
  const { pathname, hostname, port, searchParams } = new URL(resourceURL)
  const query = Object.fromEntries(
    searchParams
      .toString()
      .split('&')
      .map(kv => decodeURIComponent(kv).split('='))
  )
  const { layers: LAYERS } = query
  const layerId = `${id} - ${LAYERS}`
  const uri = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`

  const map = useMemo(
    () =>
      new Map({
        layers: new LayerGroup({
          layers: [
            esriBasemap(),
            createLayer({ id: layerId, layerType: LayerTypes.TileWMS, title, uri, LAYERS }),
          ],
        }),
        controls: defaultControls({
          zoom: false,
          rotateOptions: false,
          rotate: false,
          attribution: false,
        }),
        view: new View({
          center: [0, 0],
          zoom: 3,
          projection: 'EPSG:4326',
          smoothExtentConstraint: true,
          showFullExtent: true,
          extent: geoLocations[0].geoLocationBox
            ? new Polygon(wkt.readGeometry(geoLocations[0].geoLocationBox).getCoordinates())
                .getExtent()
                .map((v, i) => ((i === 0) | (i === 1) ? v - EXTENT_PADDING : v + EXTENT_PADDING))
            : geoLocations[0].geoLocationPoint
            ? new Point(wkt.readGeometry(geoLocations[0].geoLocationPoint).getCoordinates())
                .getExtent()
                .map((v, i) => ((i === 0) | (i === 1) ? v - EXTENT_PADDING : v + EXTENT_PADDING))
            : undefined,
        }),
      }),
    [LAYERS, layerId, title, uri]
  )

  /**
   * Test if QUERY resource is an easy to use
   * WMS server. If not, then display the
   * linkedResources field instead of a map
   */
  useEffect(() => {
    const _ = async () => {
      await fetch(`${uri}?request=GetCapabilities`)
        .then(res => res.status)
        .then(status => {
          if (status === 200) {
            setUriInspection({ error: false, loading: false })
          } else {
            setUriInspection({ error: true, loading: false })
          }
        })
        .catch(error => {
          console.error(
            `Error testing for WMS server at url: ${uri}?request=GetCapabilities`,
            error.message
          )
          setUriInspection({ error: true, loading: false })
        })
    }

    _()
  }, [uri])

  useEffect(() => {
    map.setTarget(ref.current)
  }, [map])

  return (
    <Div ref={ref} sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {uriInspection.loading && <Loading />}
      {uriInspection.error && (
        <DialogContent
          sx={{
            position: 'absolute',
            top: 0,
          }}
        >
          <Pre
            sx={{
              outline: theme => `1px solid ${theme.palette.divider}`,
              boxShadow: theme => theme.shadows[2],
            }}
          >
            {`Cannot load map - WMS resource is not responding. If the URL is to a valid WMS server, then it is currently down. Otherwise the URL is missing, incorrect, or intended for manual inspection (see below)\n\n${JSON.stringify(
              linkedResource,
              null,
              2
            )}`}
          </Pre>
        </DialogContent>
      )}
      {!uriInspection.error && !uriInspection.loading && <MapAttribution />}
    </Div>
  )
}
