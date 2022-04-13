import { createContext, useMemo } from 'react'
import npmUrl from 'url'
import { PROXY_ADDRESS } from '../../../config'
import WKT from 'ol/format/WKT'
import Polygon from 'ol/geom/Polygon'

const SPATIALDATA_PROXY = `${PROXY_ADDRESS}/saeon-spatialdata`

export const AtlasContext = createContext()

const wkt = new WKT()

export default ({ children, data }) => {
  const layers = useMemo(
    () =>
      data.catalogue.search.records
        .map(({ metadata }) => {
          const { _source } = metadata
          const { id, doi: DOI, geoLocations, immutableResource, linkedResources, titles } = _source

          if (!linkedResources) return undefined

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
              const { pathname, hostname, port, query } = npmUrl.parse(resourceURL, true)
              const { layers: LAYERS } = query
              const layerId = `${id} - ${LAYERS}`
              const uri = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`

              return {
                uri,
                description,
                title: titles[0]?.title,
                id,
                DOI,
                layerId,
                LAYERS,
                geoExtent,
                immutableResource,
                ...query,
              }
            })
        })
        .filter(_ => _)
        .flat(),
    [data]
  )

  return <AtlasContext.Provider value={{ layers, data }}>{children}</AtlasContext.Provider>
}
