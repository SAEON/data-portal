import { useContext } from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { context as searchContext } from '../../../../../../contexts/search'
import { Div, Span } from '../../../../../../components/html-tags'

/**
 * Show the selected filters in alphabetical order
 * There should only ever be a few values in the
 * activeFilters array, so don't worry about the
 * double looping
 */
export default ({ activeFilters, filterId }) => {
  const { global, setGlobal } = useContext(searchContext)
  const { terms } = global

  const sortedValues = activeFilters.sort(({ value: a }, { value: b }) =>
    a > b ? 1 : b > a ? -1 : 0
  )

  return sortedValues.map(({ value }) => {
    value = typeof value === 'number' ? `${value}` : value

    const checked = activeFilters?.map(({ value }) => value)?.includes(value) ? true : false

    return (
      <Grid key={value} item xs={12}>
        <Div sx={{ pl: theme => theme.spacing(1), display: 'flex', alignItems: 'center' }}>
          <Checkbox
            sx={{ alignSelf: 'baseline', '& .MuiSvgIcon-root': { fontSize: 16 } }}
            size="small"
            color="primary"
            checked={checked}
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
            inputProps={{ 'aria-label': 'Toggle filter', 'aria-checked': checked }}
          />
          <Tooltip title={typeof value === 'string' ? value?.toUpperCase() : value} placement="top">
            <Typography
              onClick={() =>
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
              component={Span}
              sx={{
                cursor: 'pointer',
                lineHeight: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginRight: theme => theme.spacing(2),
              }}
              variant="caption"
            >{`${typeof value === 'string' ? value.toUpperCase() : value}`}</Typography>
          </Tooltip>
        </Div>
      </Grid>
    )
  })
}
