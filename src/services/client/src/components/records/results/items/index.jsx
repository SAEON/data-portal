import React from 'react'
import ResultItem from './item'
import { Card, Grid, Typography } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.85)'

export default ({ results }) => {
  return (
    <Grid container item xs={12}>
      {results.length ? (
        results.map(item => {
          // Get record values
          const { target } = item
          const { _source, _score } = target
          const {
            identifier,
            titles,
            creators,
            descriptions,
            immutableResource,
            id,
            linkedResources,
          } = _source

          const DOI =
            identifier && identifier.identifierType.toUpperCase() === 'DOI'
              ? identifier.identifier
              : undefined

          return (
            <Grid
              key={id}
              item
              xs={12}
              style={isMobile ? { padding: '16px 16px 0 16px' } : { marginBottom: 16 }}
            >
              <ResultItem
                id={id}
                DOI={DOI}
                _source={_source}
                _score={_score}
                titles={titles}
                creators={creators}
                descriptions={descriptions}
                immutableResource={immutableResource}
                linkedResources={linkedResources}
              />
            </Grid>
          )
        })
      ) : (
        <Grid item xs={12} style={isMobile ? { padding: '16px 16px 0 16px' } : {}}>
          <Card style={{ backgroundColor: CARD_BG_COLOUR }} variant="outlined">
            <Typography
              style={{ margin: 20, display: 'block', textAlign: 'center' }}
              variant="overline"
            >
              No results found
            </Typography>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}
