import { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { context as globalContext } from '../../../../../../../contexts/global'
import useTheme from '@material-ui/core/styles/useTheme'

/**
 * Show the selected filters in alphabetical order
 * There should only ever be a few values in the
 * activeFilters array, so don't worry about the
 * double looping
 */
export default ({ activeFilters, filterId }) => {
  const theme = useTheme()
  const { global, setGlobal } = useContext(globalContext)
  const { terms } = global

  const sortedValues = activeFilters.sort(({ value: a }, { value: b }) =>
    a > b ? -1 : b > a ? 1 : 0
  )

  return sortedValues.map(({ value }) => {
    value = typeof value === 'number' ? `${value}` : value

    return (
      <Grid key={value} item xs={12}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            style={{ alignSelf: 'baseline' }}
            size="small"
            color="primary"
            checked={activeFilters?.map(({ value }) => value)?.includes(value) ? true : false}
            onChange={() =>
              setGlobal({
                terms: terms.filter(({ value: _value, filterId: _id }) => {
                  if (filterId !== _id) {
                    return true
                  } else {
                    return value !== _value
                  }
                }),
              })
            }
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Tooltip title={value?.toUpperCase()} placement="top">
            <Typography
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginRight: theme.spacing(2),
              }}
              variant="overline"
            >{`${typeof value === 'string' ? value.toUpperCase() : value}`}</Typography>
          </Tooltip>
        </div>
      </Grid>
    )
  })
}
