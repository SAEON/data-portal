import React, { Component } from 'react'
import { Card, CardHeader } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import { createLayer, LayerTypes } from '../../lib/ol'
import { Typography } from '@material-ui/core'
import InfoMenu from '../esri/_info-menu'
import LegendMenu from '../esri/_legend-menu'
import { MapContext } from '../map-provider'

const fetchMeta = (uri) => fetch(`${uri}?f=pjson`).then((res) => res.json())

export default class extends Component {
  state = {
    csirLayers: [],
    loading: true,
    error: false,
  }

  proxy = this.props.proxy
  servicesAddress = this.props.servicesAddress

  componentDidMount() {
    Promise.all(
      this.props.layers.map((uri) =>
        Promise.all([uri, fetchMeta(uri.replace(this.servicesAddress, this.proxy))])
      )
    )
      .then((csirLayers) =>
        this.setState({
          loading: false,
          error: false,
          csirLayers: Object.fromEntries(csirLayers || []),
        })
      )

      .catch((error) =>
        this.setState({
          loading: false,
          error,
          csirLayers: [],
        })
      )
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { csirLayers, loading, error } = this.state
    return loading ? (
      <Typography>Loading ...</Typography>
    ) : error ? (
      <Typography>ERROR. Unable to load CSIR layers</Typography>
    ) : (
      <MapContext.Consumer>
        {({ proxy }) => (
          <div style={{ height: '100%', overflow: 'auto', paddingRight: 5 }}>
            {Object.entries(csirLayers).map(([uri, { mapName, currentVersion }], i) => (
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
                        const proxiedUri = uri.replace(this.servicesAddress, this.proxy)
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
}
