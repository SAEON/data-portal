import { useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import { context as globalContext } from '../../../../../../contexts/global'
import { useTheme } from '@mui/material/styles'

export default ({ showAll, results, LIST_SIZE, activeFilters, field, boost, filterId }) => {
  const { global, setGlobal } = useContext(globalContext)
  const { terms } = global
  const theme = useTheme()

  const availableFilters = showAll ? results : results.slice(0, LIST_SIZE + activeFilters.length)

  return availableFilters.map(({ key, doc_count }) => {
    key = typeof key === 'number' ? `${key}` : key

    // Don't show filters that are already selected
    if ((activeFilters?.map(({ value }) => value) || []).includes(key.toString())) {
      return null
    }

    const checked = activeFilters?.map(({ value }) => value)?.includes(key) ? true : false

    return (
      <Grid key={key} item xs={12}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            style={{ alignSelf: 'baseline', display: 'flex' }}
            size="small"
            color="primary"
            checked={checked}
            onChange={() => {
              if (activeFilters?.map(({ value }) => value)?.includes(key)) {
                setGlobal({
                  terms: terms?.filter(({ value }) => value !== key)
                })
              } else {
                setGlobal({
                  terms: [...new Set([...terms, { field, boost, value: key, filterId }])]
                })
              }
            }}
            inputProps={{ 'aria-label': 'Toggle filter', 'aria-checked': checked }}
          />
          <Tooltip title={`${key?.toUpperCase()} (${doc_count})`} placement="top">
            <Typography
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginRight: theme.spacing(2)
              }}
              variant="overline"
            >{`${typeof key === 'string' ? key.toUpperCase() : key} (${doc_count})`}</Typography>
          </Tooltip>
        </div>
      </Grid>
    )
  })
}
