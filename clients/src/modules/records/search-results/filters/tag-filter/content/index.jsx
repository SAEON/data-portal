import { useState } from 'react'
import {
  ChevronDown as ExpandMoreIcon,
  ChevronUp as ExpandLessIcon,
} from '../../../../../../components/icons'
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
    <Grid container item xs={12} spacing={0}>
      {!results.length && !activeFilters.length && (
        <Div sx={{ mt: theme => theme.spacing(1), ml: theme => theme.spacing(2) }}>
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
      {results?.length > LIST_SIZE ? (
        <Button
          sx={{
            mt: theme => theme.spacing(2),
            ml: theme => theme.spacing(2),
            mb: theme => theme.spacing(2),
            pl: theme => theme.spacing(0.25),
          }}
          disableElevation
          size="small"
          variant="text"
          startIcon={
            showAll ? <ExpandLessIcon fontSize="medium" /> : <ExpandMoreIcon fontSize="medium" />
          }
          onClick={() => toggleShowAll(!showAll)}
        >
          Show {showAll ? 'less' : 'more'}
        </Button>
      ) : (
        !activeFilters.length && <Div sx={{ width: '100%', mb: theme => theme.spacing(2) }} />
      )}
    </Grid>
  )
}
