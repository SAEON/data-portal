import { Grid, Fade } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import TagFilter from './items/tag-filter'
import ExtentFilter from './items/extent-filter'
import useStyles from './style'
import clsx from 'clsx'
import { CATALOGUE_CLIENT_FILTER_CONFIG } from '../../../../config'

export default ({ catalogue }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Fade in={Boolean(catalogue)}>
      <Grid className={clsx(classes.sideBar)} container item xs={12} spacing={0}>
        {/* EXTENT FILTER */}
        <Grid item xs={12} style={{ position: 'relative' }}>
          <ExtentFilter title="Extent Filter" />
        </Grid>

        {/* CONFIGURABLE FILTERS */}
        {CATALOGUE_CLIENT_FILTER_CONFIG.map(({ title, field, sortBy, sortOrder }, i) => {
          const isLastFilter = i === CATALOGUE_CLIENT_FILTER_CONFIG.length - 1
          return (
            <Grid key={field} item xs={12}>
              <TagFilter
                style={
                  isLastFilter
                    ? {
                        borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
                      }
                    : {}
                }
                sortBy={sortBy}
                sortOrder={sortOrder}
                field={field}
                title={title}
                results={
                  catalogue?.summary.find(obj =>
                    Object.entries(obj).find(([key]) => key === field)
                  )[field]
                }
              />
            </Grid>
          )
        })}
      </Grid>
    </Fade>
  )
}
