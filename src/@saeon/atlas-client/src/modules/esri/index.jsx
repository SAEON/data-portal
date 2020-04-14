import React, { useState, useEffect } from 'react'
import { Card, CardHeader } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import { createLayer, LayerTypes } from '../../lib/ol'
import { Typography } from '@material-ui/core'
import InfoMenu from '../esri/_info-menu'
import LegendMenu from '../esri/_legend-menu'
import { MapContext } from '../map-provider'

const fetchMeta = ({ uri, abortController }) =>
  fetch(`${uri}?f=pjson`, {
    mode: 'cors',
    signal: abortController?.signal,
    headers: {
      Accept: 'application/json',
    },
  }).then((res) => res.json())

export default ({ apiProxyAddress, servicesAddress, layers }) => {
  const [state, setState] = useState({
    esriLayers: [],
    loading: true,
    error: false,
  })

  useEffect(() => {
    const abortController = new AbortController()
    Promise.all(
      layers.map((uri) =>
        Promise.all([
          uri,
          fetchMeta({
            uri: uri.replace(servicesAddress, apiProxyAddress),
            abortController,
          }),
        ])
      )
    )
      .then((esriLayers) => {
        if (!abortController.signal.aborted) {
          setState({
            loading: false,
            error: false,
            esriLayers: Object.fromEntries(esriLayers || []),
          })
        }
      })
      .catch((error) => {
        if (!abortController.signal.aborted) {
          setState({
            loading: false,
            error,
            esriLayers: [],
          })
        }
      })

    return () => abortController.abort()
  }, [])

  return state.loading ? (
    <Typography>Loading ...</Typography>
  ) : state.error ? (
    <Typography>ERROR. Unable to load data from ESRI RESTful services</Typography>
  ) : (
    <MapContext.Consumer>
      {({ proxy }) => (
        <div style={{ height: '100%', overflow: 'auto', paddingRight: 5 }}>
          {Object.entries(state.esriLayers).map(([uri, { mapName, currentVersion }], i) => (
            <Card key={i} style={{ margin: 5 }} variant="outlined" square={true}>
              <CardHeader
                titleTypographyProps={{
                  variant: 'overline',
                }}
                subheaderTypographyProps={{
                  variant: 'caption',
                }}
                title={mapName || 'UNKNOWN TITLE'}
                subheader={`VERSION ${currentVersion}`}
                action={
                  <Checkbox
                    style={{ float: 'right' }}
                    size="small"
                    edge="start"
                    checked={proxy.getLayerById(uri) ? true : false}
                    onChange={({ target }) => {
                      const proxiedUri = uri.replace(servicesAddress, apiProxyAddress)
                      const { checked } = target
                      if (checked) {
                        proxy.addLayer(
                          createLayer({
                            InfoMenu: () => (
                              <InfoMenu uri={`${proxiedUri}/layers?f=pjson`} title={mapName} />
                            ),
                            LegendMenu: () => (
                              <LegendMenu uri={`${proxiedUri}/legend?f=pjson`} title={mapName} />
                            ),
                            layerType: LayerTypes.TileArcGISRest,
                            id: uri,
                            uri: proxiedUri,
                            title: mapName,
                          })
                        )
                      } else {
                        proxy.removeLayerById(uri)
                      }
                    }}
                  />
                }
              />
            </Card>
          ))}
        </div>
      )}
    </MapContext.Consumer>
  )
}
