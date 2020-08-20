import React, { useContext } from 'react'
import ResultItem from './item'
import { Grid, Typography, Card } from '@material-ui/core'
import { UriStateContext } from '../../../modules/provider-uri-state'
import { isMobile } from 'react-device-detect'

export default ({ results }) => {
  const { setUriState, getUriState } = useContext(UriStateContext)

  return (
    <Card
      variant="outlined"
      style={{ height: '100%', borderLeft: isMobile ? 'none' : '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Grid item xs={12}>
        {results.length ? (
          results.map(item => {
            // Get record values
            const { target } = item
            const { _source, _id, _score } = target
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
                  const toggled = getUriState({ splitString: true }).layers?.includes(id)
                  return {
                    id,
                    toggled,
                    toggle: () => {
                      setUriState({
                        layers: toggled
                          ? [...getUriState({ splitString: true }).layers].filter(p => p !== id)
                          : [
                              ...new Set([
                                ...(getUriState({ splitString: true }).layers || []),
                                id,
                              ]),
                            ],
                      })
                    },
                  }
                })

            return (
              <ResultItem
                DOI={DOI}
                _source={_source}
                _score={_score}
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
          <Typography style={{ margin: 20, display: 'block' }} variant="overline">
            No results found
          </Typography>
        )}
      </Grid>
    </Card>
  )
}
