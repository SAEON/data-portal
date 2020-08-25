import React, { useContext, createContext } from 'react'
import { UriStateContext } from '../../../modules/provider-uri-state'
import useCatalogue from '../../../lib/useCatalogue'

export const AtlasContext = createContext()

export default ({ children }) => {
  const { getUriState } = useContext(UriStateContext)
  let { layers = undefined } = getUriState({ splitString: true })
  const { layersearch = undefined } = getUriState({
    splitString: false,
  })

  /**
   * Layers is an array of strings:
   * ["doi~<link no.>", "doi~<link no.>", etc.]
   *
   * DOIs can have multiple links. This code creates a
   * map that looks something like this:
   * {
   *  "10.15493/SARVA.CSAG.10000145": ["link 1"]
   *  "10.15493/SARVA.CSAG.10000252": ["link 1"]
   *  "10.15493/SARVA.CSAG.10000371": ["link 1"]
   *  "DummyDOI3816": ["link 1", "link 2"]
   * }
   */
  const doiMap = layers?.reduce(
    (acc, layerId) =>
      Object.assign(acc, {
        [layerId.split('~')[0]]: [
          ...new Set([...(acc[layerId.split('~')[0]] || []), layerId.split('~')[1]].filter(_ => _)),
        ].sort(),
      }),
    {}
  )

  var gqlData
  if (layersearch) {
    // TODO - some kind of pagination will be required
    gqlData = useCatalogue({ pageSize: 5000 })
  } else {
    gqlData = useCatalogue({
      /**
       * Convert doiMap into a terms query, that looks like this:
       * [
       *  { field: 'identifier.identifier.raw', value: '10.15493/SARVA.CSAG.10000145' },
       *  { field: 'identifier.identifier.raw', value: '"10.15493/SARVA.CSAG.10000252' },
       *  { etc. }
       * ]
       */
      terms: [...new Set(Object.entries(doiMap || {}).map(([k]) => k))].map(k => ({
        field: 'identifier.identifier.raw',
        value: k,
      })),
      pageSize: 5000,
    })
  }

  return <AtlasContext.Provider value={{ gqlData }}>{children}</AtlasContext.Provider>
}
