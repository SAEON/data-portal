import Grid from '@mui/material/Grid'
import TagFilter from './tag-filter'
import DomainFilter from './domain-filter'
import Paper from '@mui/material/Paper'
import { CLIENT_FILTER_CONFIG } from '../../../../config'
import TemporalFilter from './temporal-filter'

const defaultExpandedFields = ['keywords'].map(w => w.toLowerCase())

export default ({ catalogue }) => {
  return (
    <Grid
      sx={{
        mb: theme => theme.spacing(2),
        borderRadius: theme => `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
      }}
      component={Paper}
      container
      item
      xs={12}
      spacing={0}
    >
      {/* EXTENT FILTER */}
      <Grid item xs={12} sx={{ position: 'relative' }}>
        <DomainFilter title="Domain" />
      </Grid>

      {/* CONFIGURABLE FILTERS */}
      {CLIENT_FILTER_CONFIG.map(({ id, title, field, boost, contexts, type }) => {
        const items = catalogue?.summary.find(obj => {
          const agg = Object.entries(obj).find(([key]) => key === id)
          return agg
        })[id]

        if (type === 'temporal-range') {
          return (
            <Grid key={id} item xs={12}>
              <TemporalFilter
                id={id}
                defaultExpanded={defaultExpandedFields.includes(title.toLowerCase())}
                contexts={contexts}
                field={field}
                title={title}
                boost={boost}
                results={items}
              />
            </Grid>
          )
        }

        return (
          <Grid key={id} item xs={12}>
            <TagFilter
              id={id}
              defaultExpanded={defaultExpandedFields.includes(title.toLowerCase())}
              contexts={contexts}
              field={field}
              title={title}
              boost={boost}
              results={items}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
