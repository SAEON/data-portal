import React, { createContext, useMemo } from 'react'

export const AtlasContext = createContext()

export default ({ children, gqlData }) => {
  console.log('rendering state')
  const layers = useMemo(
    () =>
      gqlData.data.catalogue.records.nodes
        .map(({ target }) => {
          const { _source } = target
          const { id, identifier } = _source
          const DOI =
            identifier && identifier.identifierType.toUpperCase() === 'DOI'
              ? identifier.identifier
              : undefined

          return target._source.linkedResources
            .filter(({ linkedResourceType: t }) => t.toUpperCase() === 'QUERY')
            .map(({ resourceURL: uri, resourceDescription: description }) => ({
              uri,
              description,
              id,
              DOI,
            }))
        })
        .flat(),
    [gqlData]
  )

  return <AtlasContext.Provider value={{ layers, gqlData }}>{children}</AtlasContext.Provider>
}
