import React, { useContext } from 'react'
import ResultItem from './item'
import { Grid, Typography, Card } from '@material-ui/core'
import { GlobalContext } from '../../../modules/provider-global'
import { isMobile } from 'react-device-detect'

export default ({ results }) => {
  const { global, setGlobal } = useContext(GlobalContext)

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
            const { _source, _score } = target
            const {
              identifier,
              titles,
              contributors,
              descriptions,
              immutableResource,
              id,
            } = _source

            const DOI =
              identifier && identifier.identifierType.toUpperCase() === 'DOI'
                ? identifier.identifier
                : undefined

            return (
              <ResultItem
                DOI={DOI}
                _source={_source}
                _score={_score}
                titles={titles}
                contributors={contributors}
                descriptions={descriptions}
                immutableResource={immutableResource}
                key={id}
                id={id}
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
