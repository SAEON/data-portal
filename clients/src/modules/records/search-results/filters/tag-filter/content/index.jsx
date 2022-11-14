import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ActiveFilters from './_active-filters'
import AvailableFilters from './_available-filters'
import { Div } from '../../../../../../components/html-tags'
import Typography from '@mui/material/Typography'

const LIST_SIZE = 3

export default ({ results, activeFilters, filterId, field, boost }) => {
  const [showAll, toggleShowAll] = useState(false)

  return (
    <Paper variant="outlined">
      <Grid container item xs={12} spacing={0}>
        {!results.length && !activeFilters.length && (
          <Div sx={{ my: theme => theme.spacing(2), ml: theme => theme.spacing(3) }}>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              No filters available
            </Typography>
          </Div>
        )}

        {/* SELECTED FILTERS */}
        <ActiveFilters activeFilters={activeFilters} filterId={filterId} />

        {/* SPACING (between active filters and available filters) */}
        {Boolean(activeFilters.length) && (
          <Grid container item xs={12} spacing={0}>
            <Grid item xs>
              <Div sx={{ m: theme => theme.spacing(2) }} />
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
            sx={{
              mt: theme => theme.spacing(2),
              ml: theme => theme.spacing(1),
              mb: theme => theme.spacing(2),
            }}
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
    </Paper>
  )
}