import React, { PureComponent } from 'react'
import { esriLayer } from '../../lib/ol'
import { Grid, Typography } from '@material-ui/core'
import ServerObject from './_server-obj'
import esriServers from './layers'
// ...esriUrls.map((uri, i) => esriLayer({ uri, title: 'esri ' + i })),

const fetchMeta = uri => fetch(`${uri}?f=pjson`).then(res => res.json())

export default class extends PureComponent {
  state = {
    servers: []
  }

  async componentDidMount() {
    this.setState({
      servers: await Promise.all(esriServers.map(uri => fetchMeta(uri)))
    })
  }

  render() {
    const { servers } = this.state
    return (
      <Grid container direction="column" justify="center" alignItems="stretch">
        {servers.map((json, i) => (
          <Grid key={i} item>
            <ServerObject {...json} />
          </Grid>
        ))}
      </Grid>
    )
  }
}
