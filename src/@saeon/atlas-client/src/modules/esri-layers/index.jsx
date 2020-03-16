import React, { Component } from 'react'
import { Card, CardHeader } from '@material-ui/core'
import esriServers from './layers'
import { Checkbox } from '@material-ui/core'
import { esriLayer } from '../../lib/ol'

const fetchMeta = uri => fetch(`${uri}?f=pjson`).then(res => res.json())

export default class extends Component {
  state = {
    servers: []
  }

  async componentDidMount() {
    this.setState({
      servers: await Promise.all(esriServers.map(uri => fetchMeta(uri)))
    })
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { proxy } = this.props
    const { servers } = this.state
    return (
      <div style={{ height: '100%', overflow: 'auto', paddingRight: 5 }}>
        {servers.map(({ mapName, currentVersion }, i) => (
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
                  checked={proxy.getLayerById(mapName) ? true : false}
                  onChange={({ target }) => {
                    const { checked } = target
                    if (checked) {
                      proxy.addLayer(esriLayer({ uri: esriServers[i], title: mapName }))
                    } else {
                      proxy.removeLayerById(mapName)
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
