import Grid from '@mui/material/Grid'
import TagFilter from './tag-filter'
import ExtentFilter from './extent-filter'
import { CATALOGUE_CLIENT_FILTER_CONFIG } from '../../../../config'

const defaultExpandedFields = ['keywords'].map(w => w.toLowerCase())

export default ({ catalogue }) => {
  return (
    <Grid container item xs={12} spacing={0}>
      {/* EXTENT FILTER */}
      <Grid item xs={12} sx={{ position: 'relative' }}>
        <ExtentFilter title="Domain" />
      </Grid>

      {/* CONFIGURABLE FILTERS */}
      {CATALOGUE_CLIENT_FILTER_CONFIG.map(({ id, title, field, boost }) => {
        const items = catalogue?.summary.find(obj => {
          const agg = Object.entries(obj).find(([key]) => key === id)
          return agg
        })[id]

        return (
          <Grid
            key={id}
            item
            xs={12}
            sx={{
              ':last-child': {
                mb: theme => theme.spacing(2),
                borderRadius: theme =>
                  `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
              },
            }}
          >
            <TagFilter
              sx={{
                zIndex: 1,
              }}
              id={id}
              defaultExpanded={defaultExpandedFields.includes(title.toLowerCase())}
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
