import React, { createContext, useMemo } from 'react'
import npmUrl from 'url'
import { CATALOGUE_API_ADDRESS } from '../../../config'
import WKT from 'ol/format/WKT'
import Polygon from 'ol/geom/Polygon'

const SPATIALDATA_PROXY = `${CATALOGUE_API_ADDRESS}/proxy/saeon-spatialdata`

export const AtlasContext = createContext()

const wkt = new WKT()

export default ({ children, gqlData }) => {
  const layers = useMemo(
    () =>
      gqlData.data.catalogue.records.nodes
        .map(({ target }) => {
          const { _source } = target
          const { id, identifier, geoLocations, immutableResource, linkedResources } = _source

          if (!linkedResources) return undefined

          const DOI =
            identifier && identifier.identifierType.toUpperCase() === 'DOI'
              ? identifier.identifier
              : undefined

          let geoExtent
          try {
            geoExtent = new Polygon(
              wkt.readGeometry(geoLocations[0].geoLocationBox).getCoordinates()
            )
              .getExtent()
              .map((v, i) => ((i === 0) | (i === 1) ? v - 1 : v + 1)) // subtract for minX/minY, expand for maxX, maxY
          } catch {
            geoExtent = undefined
          }

          return linkedResources
            ?.filter(({ linkedResourceType: t }) => t.toUpperCase() === 'QUERY')
            .map(({ resourceURL, resourceDescription: description }) => {
              const { pathname, query, port, hostname } = npmUrl.parse(resourceURL, true)
              const { layers: LAYERS } = query
              const layerId = `${id} - ${LAYERS}`
              const uri = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`

              return {
                uri,
                description,
                id,
                DOI,
                layerId,
                LAYERS,
                geoExtent,
                immutableResource,
              }
            })
        })
        .filter(_ => _)
        .flat(),
    [gqlData]
  )

  return <AtlasContext.Provider value={{ layers, gqlData }}>{children}</AtlasContext.Provider>
}
