import { Grid, Fade } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import TagFilter from './items/tag-filter'
import ExtentFilter from './items/extent-filter'
import useStyles from './style'
import clsx from 'clsx'
import { CATALOGUE_CLIENT_FILTER_CONFIG } from '../../../../config'

/**
 * NOTE
 *
 * These values needs to match the delimeter
 * defined on the server in the summary GQL resolver.
 *
 * DON'T CHANGE
 * DON'T CHANGE
 * DON'T CHANGE
 */
const FILTER_DELIMITER = '__FILTERED_BY__'
const FILTER_VALUE_DELIMTER = ''

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
        {CATALOGUE_CLIENT_FILTER_CONFIG.map(
          ({ title, field, boost, sortBy, sortOrder, filter = {} }, i) => {
            const isLastFilter = i === CATALOGUE_CLIENT_FILTER_CONFIG.length - 1
            const { values: allowedValues = undefined } = filter
            const aggregationName = allowedValues
              ? `${field}${FILTER_DELIMITER}${allowedValues.join(FILTER_VALUE_DELIMTER)}`
              : field
            const items = catalogue?.summary.find(obj => {
              const agg = Object.entries(obj).find(([key]) => key === aggregationName)
              return agg
            })[aggregationName]

            return (
              <Grid key={aggregationName} item xs={12}>
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
                  boost={boost}
                  results={items}
                />
              </Grid>
            )
          }
        )}
      </Grid>
    </Fade>
  )
}
