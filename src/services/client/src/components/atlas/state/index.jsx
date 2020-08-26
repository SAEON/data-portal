import React, { createContext, useMemo } from 'react'
import npmUrl from 'url'
import { CATALOGUE_API_ADDRESS } from '../../../config'

const SPATIALDATA_PROXY = `${CATALOGUE_API_ADDRESS}/proxy/saeon-spatialdata`

export const AtlasContext = createContext()

export default ({ children, gqlData }) => {
  const layers = useMemo(
    () =>
      gqlData.data.catalogue.records.nodes
        .map(({ target }) => {
          const { _source } = target
          const { id, identifier, alternateIdentifiers } = _source
          const DOI =
            identifier && identifier.identifierType.toUpperCase() === 'DOI'
              ? identifier.identifier
              : undefined
          const ploneId = alternateIdentifiers?.find(
            ({ alternateIdentifierType }) => alternateIdentifierType.toLowerCase() === 'plone'
          ).alternateIdentifier

          return target._source.linkedResources
            .filter(({ linkedResourceType: t }) => t.toUpperCase() === 'QUERY')
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
                ploneId,
                layerId,
                LAYERS,
              }
            })
        })
        .flat(),
    [gqlData]
  )

  return <AtlasContext.Provider value={{ layers, gqlData }}>{children}</AtlasContext.Provider>
}
