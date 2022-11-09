import Grid from '@mui/material/Grid'
import TagFilter from './tag-filter'
import ExtentFilter from './extent-filter'
import { CATALOGUE_CLIENT_FILTER_CONFIG } from '../../../../config'

const defaultExpandedFields = ['subjects.subject.raw']

export default ({ catalogue }) => {
  return (
    <Grid container item xs={12} spacing={0}>
      {/* EXTENT FILTER */}
      <Grid item xs={12} sx={{ position: 'relative' }}>
        <ExtentFilter title="Domain" />
      </Grid>

      {/* CONFIGURABLE FILTERS */}
      {CATALOGUE_CLIENT_FILTER_CONFIG.map(({ id, title, field, boost }, i) => {
        const isLastFilter = i === CATALOGUE_CLIENT_FILTER_CONFIG.length - 1
        const items = catalogue?.summary.find(obj => {
          const agg = Object.entries(obj).find(([key]) => key === id)
          return agg
        })[id]

        return (
          <Grid key={id} item xs={12}>
            <TagFilter
              sx={
                isLastFilter
                  ? {
                      zIndex: 1,
                      borderRadius: theme =>
                        `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
                    }
                  : { zIndex: 1 }
              }
              id={id}
              defaultExpanded={defaultExpandedFields.includes(field)}
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
