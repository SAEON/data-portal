import React, { useContext } from 'react'
import ResultItem from './item'
import { Grid, Typography } from '@material-ui/core'
import { UriStateContext } from '../../../modules/provider-uri-state'

export default ({ results }) => {
  const { setUriState, getUriState } = useContext(UriStateContext)

  return (
    <Grid item xs={12}>
      {results.length ? (
        results.map(item => {
          // Get record values
          const { score, target } = item
          const { _source, _id } = target
          const {
            identifier,
            titles,
            contributors,
            descriptions,
            alternateIdentifiers,
            immutableResource,
            linkedResources,
          } = _source

          const DOI =
            identifier && identifier.identifierType.toUpperCase() === 'DOI'
              ? identifier.identifier
              : undefined

          const selectedLinkedResources =
            DOI &&
            linkedResources
              ?.filter(({ linkedResourceType: t }) => t.toUpperCase() === 'QUERY')
              ?.map((_, i) => {
                const id = `${DOI}~link ${i + 1}`
                const toggled = getUriState(true).preview?.includes(id)
                return {
                  id,
                  toggled,
                  toggle: () => {
                    setUriState({
                      preview: toggled
                        ? [...getUriState(true).preview].filter(p => p !== id)
                        : [...new Set([...(getUriState(true).preview || []), id])],
                    })
                  },
                }
              })

          return (
            <ResultItem
              DOI={DOI}
              score={score}
              _source={_source}
              titles={titles}
              contributors={contributors}
              descriptions={descriptions}
              alternateIdentifiers={alternateIdentifiers}
              immutableResource={immutableResource}
              selectedLinkedResources={selectedLinkedResources}
              key={_id}
            />
          )
        })
      ) : (
        <Typography variant="overline">No results found</Typography>
      )}
    </Grid>
  )
}
