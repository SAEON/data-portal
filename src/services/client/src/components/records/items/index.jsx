import React from 'react'
import ResultItem from './item'
import { Grid, Typography } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

export default ({ results }) => {
  return (
    <Grid container item xs={12} spacing={isMobile ? 0 : 2}>
      {results.length ? (
        results.map(item => {
          // Get record values
          const { target } = item
          const { _source, _score } = target
          const { identifier, titles, contributors, descriptions, immutableResource, id } = _source

          const DOI =
            identifier && identifier.identifierType.toUpperCase() === 'DOI'
              ? identifier.identifier
              : undefined

          return (
            <Grid
              key={id}
              item
              xs={12}
              style={isMobile ? { padding: isMobile ? '16px 16px 0 16px' : 0 } : {}}
            >
              <ResultItem
                DOI={DOI}
                _source={_source}
                _score={_score}
                titles={titles}
                contributors={contributors}
                descriptions={descriptions}
                immutableResource={immutableResource}
                id={id}
              />
            </Grid>
          )
        })
      ) : (
        <Typography style={{ margin: 20, display: 'block' }} variant="overline">
          No results found
        </Typography>
      )}
    </Grid>
  )
}
