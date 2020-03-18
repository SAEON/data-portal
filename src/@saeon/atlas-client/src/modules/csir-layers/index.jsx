import React, { Component } from 'react'
import { Card, CardHeader } from '@material-ui/core'
import esriLayers from './layers'
import { Checkbox } from '@material-ui/core'
import { esriLayer } from '../../lib/ol'

const ATLAS_API_ADDRESS = process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'

const fetchMeta = uri => fetch(`${uri}?f=pjson`).then(res => res.json())

export default class extends Component {
  state = {
    esriLayers: []
  }

  async componentDidMount() {
    this.setState({
      esriLayers: Object.fromEntries(
        await Promise.all(
          esriLayers.map(uri =>
            Promise.all([
              uri,
              fetchMeta(
                uri.replace(
                  'https://pta-gis-2-web1.csir.co.za/server2/rest/services',
                  `${ATLAS_API_ADDRESS}/csir`
                )
              )
            ])
          )
        )
      )
    })
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { proxy } = this.props
    const { esriLayers } = this.state
    return (
      <div style={{ height: '100%', overflow: 'auto', paddingRight: 5 }}>
        {Object.entries(esriLayers).map(([uri, { mapName, currentVersion }], i) => (
          <Card key={i} style={{ margin: 5 }} variant="outlined" square={true}>
            <CardHeader
              titleTypographyProps={{
                variant: 'overline'
              }}
              subheaderTypographyProps={{
                variant: 'caption'
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
                    const { checked } = target
                    if (checked) {
                      proxy.addLayer(
                        esriLayer({
                          id: uri,
                          sourceType: 'esri',
                          uri: uri.replace(
                            'https://pta-gis-2-web1.csir.co.za/server2/rest/services',
                            `${ATLAS_API_ADDRESS}/csir`
                          ),
                          title: mapName
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
