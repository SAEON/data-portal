import React from 'react'
import { Card, CardHeader, Checkbox } from '@material-ui/core'
import npmUrl from 'url'
import { VirtualList } from '../../components'
import { createLayer, LayerTypes } from '../../lib/ol'
import LegendMenu from './_legend-menu'
import { MapContext } from '../map-provider'

const SPATIALDATA_PROXY = `${
  process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'
}/proxy/saeon-spatialdata`

export default ({ height, width, data }) => {
  return (
    <MapContext.Consumer>
      {({ proxy }) => (
        <VirtualList
          items={data.hits.hits
            .map(({ _source }) => {
              const { metadata_json } = _source
              return (
                metadata_json.linkedResources
                  ?.filter((r) => r.linkedResourceType === 'Query')
                  ?.map(({ resourceURL, resourceDescription }) => {
                    const uri = npmUrl.parse(resourceURL, true)
                    const { protocol, pathname, query, port, hostname } = uri
                    const { layers } = query
                    const layerId = `${resourceDescription} - ${layers}`
                    return {
                      layerId,
                      resourceURL,
                      resourceDescription,
                      protocol,
                      port,
                      hostname,
                      pathname,
                      layers,
                    }
                  }) || []
              )
            })
            .flat()}
          height={height}
          width={width}
          Template={({ hostname, layerId, port, pathname, layers, resourceDescription }) => {
            return (
              <Card style={{ marginRight: 5 }} variant="outlined" square={true}>
                <CardHeader
                  titleTypographyProps={{
                    variant: 'overline',
                  }}
                  subheaderTypographyProps={{
                    variant: 'caption',
                  }}
                  title={resourceDescription}
                  subheader={layerId}
                  action={
                    <Checkbox
                      style={{ float: 'right' }}
                      size="small"
                      edge="start"
                      checked={Boolean(proxy.getLayerById(layerId))}
                      onChange={({ target }) => {
                        if (target.checked) {
                          let serverAddress = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`
                          console.log(hostname)
                          proxy.addLayer(
                            createLayer({
                              LegendMenu: () => (
                                <LegendMenu
                                  title={layerId}
                                  uri={`${serverAddress}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&TRANSPARENT=true&LAYER=${layers}&LEGEND_OPTIONS=forceLabels:on`}
                                />
                              ),
                              layerType: LayerTypes.TileWMS,
                              id: layerId,
                              title: layerId,
                              uri: serverAddress,
                              LAYERS: layers,
                            })
                          )
                        } else {
                          proxy.removeLayerById(layerId)
                        }
                      }}
                    />
                  }
                />
              </Card>
            )
          }}
          loadMoreItems={async () => {
            alert('TODO - this is being migrated to a Lucene-based search')
          }}
        />
      )}
    </MapContext.Consumer>
  )
}
