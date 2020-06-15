import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Checkbox,
  Typography,
} from '@material-ui/core'
import { createLayer, LayerTypes } from '../../../../lib/ol'
import InfoMenu from './_info-menu'
import LegendMenu from './_legend-menu'
import { MapContext } from '../../../provider-map'

const fetchMeta = ({ uri, abortController }) =>
  fetch(`${uri}?f=pjson`, {
    mode: 'cors',
    signal: abortController?.signal,
    headers: {
      Accept: 'application/json',
    },
  }).then(res => res.json())

export default ({ apiProxyAddress, servicesAddress, layers }) => {
  const [state, setState] = useState({
    esriLayers: [],
    loading: true,
    error: false,
  })

  useEffect(() => {
    const abortController = new AbortController()
    Promise.all(
      layers.map(uri =>
        Promise.all([
          uri,
          fetchMeta({
            uri: uri.replace(servicesAddress, apiProxyAddress),
            abortController,
          }),
        ])
      )
    )
      .then(esriLayers => {
        if (!abortController.signal.aborted) {
          setState({
            loading: false,
            error: false,
            esriLayers: Object.fromEntries(esriLayers || []),
          })
        }
      })
      .catch(error => {
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
          {Object.entries(state.esriLayers).map(([uri, { mapName, currentVersion, layers }], i) => (
            <Card key={i} style={{ margin: 5 }} variant="outlined" square={true}>
              <CardHeader
                title={mapName || 'UNKNOWN TITLE'}
                subheader={`VERSION ${currentVersion}`}
              />
              <CardContent title="Layers">
                <List>
                  {layers.map(({ name }, i) => {
                    const proxiedUri = uri.replace(servicesAddress, apiProxyAddress)
                    const id = `${uri}-${name}`
                    return (
                      // Layer
                      <ListItem
                        onClick={() => console.log('TODO - this should load layer info')}
                        key={i}
                        role={undefined}
                        dense
                        button
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            alt="Thumbnail"
                            src={`${proxiedUri}/info/thumbnail`}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={name} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="start"
                            checked={proxy.getLayerById(id) ? true : false}
                            tabIndex={-1}
                            disableRipple
                            onChange={({ target }) => {
                              const { checked } = target
                              if (checked) {
                                proxy.addLayer(
                                  createLayer({
                                    InfoMenu: () => (
                                      <InfoMenu uri={`${proxiedUri}/layers?f=pjson`} title={name} />
                                    ),
                                    LegendMenu: () => (
                                      <LegendMenu
                                        uri={`${proxiedUri}/legend?f=pjson`}
                                        title={name}
                                      />
                                    ),
                                    layerType: LayerTypes.TileArcGISRest,
                                    id,
                                    uri: proxiedUri,
                                    title: mapName,
                                  })
                                )
                              } else {
                                proxy.removeLayerById(id)
                              }
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })}
                </List>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </MapContext.Consumer>
  )
}
