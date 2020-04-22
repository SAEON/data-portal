import React from 'react'
import { Card, CardHeader, Checkbox, IconButton, Link } from '@material-ui/core'
import npmUrl from 'url'
import { VirtualList } from '../../../../../components'
import { createLayer, LayerTypes } from '../../../../../lib/ol'
import LegendContent from './_legend'
import { MapContext } from '../../../../provider-map'
import { FeedbackContext } from '../../../../provider-feedback'
import { Visibility as VisibilityIcon } from '@material-ui/icons'
import { ATLAS_API_ADDRESS } from '../../../../../config'

const SPATIALDATA_PROXY = `${ATLAS_API_ADDRESS}/proxy/saeon-spatialdata`

export default ({ height, width, data }) => {
  return (
    <FeedbackContext.Consumer>
      {({ setInfo }) => (
        <MapContext.Consumer>
          {({ proxy }) => (
            <VirtualList
              items={data.hits.hits
                .map(({ _source }) => {
                  const { metadata_json } = _source
                  const { alternateIdentifiers } = metadata_json
                  return (
                    metadata_json.linkedResources
                      ?.filter((r) => r.linkedResourceType === 'Query')
                      ?.map(({ resourceURL, resourceDescription }) => {
                        const uri = npmUrl.parse(resourceURL, true)
                        const { protocol, pathname, query, port, hostname } = uri
                        const { layers } = query
                        const layerId = `${resourceDescription} - ${layers}`
                        const altId = alternateIdentifiers?.filter(
                          ({ alternateIdentifierType }) =>
                            alternateIdentifierType.toLowerCase() === 'plone'
                        )?.[0]?.alternateIdentifier
                        const metadataUrl = `http://www.sasdi.net/metaview.aspx?uuid=${altId}`
                        return {
                          layerId,
                          resourceURL,
                          resourceDescription,
                          protocol,
                          port,
                          hostname,
                          pathname,
                          layers,
                          metadataUrl,
                        }
                      }) || []
                  )
                })
                .flat()}
              height={height}
              width={width}
              Template={({
                hostname,
                layerId,
                port,
                pathname,
                layers,
                resourceDescription,
                metadataUrl,
              }) => {
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
                        <div>
                          <Link target="_blank" rel="noopener noreferrer" href={metadataUrl}>
                            <IconButton ria-label="view-record">
                              <VisibilityIcon size="small" />
                            </IconButton>
                          </Link>

                          <Checkbox
                            size="small"
                            edge="start"
                            checked={Boolean(proxy.getLayerById(layerId))}
                            onChange={({ target }) => {
                              if (port && hostname && pathname) {
                                if (target.checked) {
                                  let serverAddress = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`
                                  proxy.addLayer(
                                    createLayer({
                                      LegendMenu: () => (
                                        <LegendContent
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
                              } else {
                                setInfo(
                                  `This layer has a URI that we don't understand yet. We are working to improve this, and it should be available soon! : ${hostname}, ${port}, ${pathname}`
                                )
                              }
                            }}
                          />
                        </div>
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
      )}
    </FeedbackContext.Consumer>
  )
}
