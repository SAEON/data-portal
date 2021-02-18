import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ActiveFilters from './_active-filters'
import AvailableFilters from './_available-filters'

const LIST_SIZE = 3

export default ({ results, activeFilters, filterId, field, boost }) => {
  const [showAll, toggleShowAll] = useState(false)

  return (
    <Card variant="outlined">
      <Grid container item xs={12} spacing={0}>
        {/* SELECTED FILTERS */}
        <ActiveFilters activeFilters={activeFilters} filterId={filterId} />

        {/* SPACING (between active filters and available filters) */}
        {Boolean(activeFilters.length) && (
          <Grid container item xs={12} spacing={0}>
            <Grid item xs>
              <div style={{ margin: 8 }} />
            </Grid>
          </Grid>
        )}

        {/* AVAILABLE FILTERS */}
        <AvailableFilters
          field={field}
          boost={boost}
          filterId={filterId}
          activeFilters={activeFilters}
          showAll={showAll}
          results={results}
          LIST_SIZE={LIST_SIZE}
        />

        {/* SHOW MORE */}
        {results?.length > LIST_SIZE && (
          <Button
            style={{ marginTop: 10, marginLeft: 5, marginBottom: 10 }}
            disableElevation
            size="small"
            variant="text"
            startIcon={showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => toggleShowAll(!showAll)}
          >
            Show {showAll ? 'less' : 'more'}
          </Button>
        )}
      </Grid>
    </Card>
  )
}
