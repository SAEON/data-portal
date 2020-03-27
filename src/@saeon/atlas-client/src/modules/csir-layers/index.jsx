import React, { Component } from 'react'
import { Card, CardHeader } from '@material-ui/core'
import layersConfig from './layers'
import { Checkbox } from '@material-ui/core'
import { createLayer, LayerTypes } from '../../lib/ol'
import { Typography } from '@material-ui/core'
import InfoMenu from './_info-menu'
import LegendMenu from './_legend-menu'

const CSIR_PROXY = `${process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'}/proxy/csir`

const fetchMeta = (uri) => fetch(`${uri}?f=pjson`).then((res) => res.json())

export default class extends Component {
  state = {
    csirLayers: [],
    loading: true,
    error: false,
  }

  componentDidMount() {
    Promise.all(
      layersConfig.map((uri) =>
        Promise.all([
          uri,
          fetchMeta(
            uri.replace('https://pta-gis-2-web1.csir.co.za/server2/rest/services', CSIR_PROXY)
          ),
        ])
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
    const { proxy } = this.props
    const { csirLayers, loading, error } = this.state
    return loading ? (
      <Typography>Loading ...</Typography>
    ) : error ? (
      <Typography>ERROR. Unable to load CSIR layers</Typography>
    ) : (
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
                    const proxiedUri = uri.replace(
                      'https://pta-gis-2-web1.csir.co.za/server2/rest/services',
                      CSIR_PROXY
                    )
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
    )
  }
}
