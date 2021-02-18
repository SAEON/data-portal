import { useContext, useMemo } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import { context as globalContext } from '../../../../../../../contexts/global'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({
  showAll,
  results,
  LIST_SIZE,
  activeFilters,
  field,
  boost,
  filterId,
  sortBy,
  sortOrder,
}) => {
  const { global, setGlobal } = useContext(globalContext)
  const { terms } = global
  const theme = useTheme()

  const availableFilters = useMemo(() => {
    const sortedResults = [...results].sort(
      ({ key: aKey, doc_count: aDocCount }, { key: bKey, doc_count: bDocCount }) => {
        let sort
        if (sortBy === 'key') {
          sort = aKey > bKey ? 1 : aKey === bKey ? 0 : -1
        } else {
          sort = aDocCount > bDocCount ? 1 : aDocCount === bDocCount ? 0 : -1
        }
        return sortOrder === 'asc' ? sort * 1 : sort * -1
      }
    )

    return showAll ? sortedResults : sortedResults.slice(0, LIST_SIZE)
  }, [results, sortBy, sortOrder, LIST_SIZE, showAll])

  return availableFilters.map(({ key, doc_count }) => {
    key = typeof key === 'number' ? `${key}` : key

    // Don't show filters that are already selected
    if ((activeFilters?.map(({ value }) => value) || []).includes(key.toString())) {
      return null
    }

    return (
      <Grid key={key} item xs={12}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            style={{ alignSelf: 'baseline', display: 'flex' }}
            size="small"
            color="primary"
            checked={activeFilters?.map(({ value }) => value)?.includes(key) ? true : false}
            onChange={() => {
              if (activeFilters?.map(({ value }) => value)?.includes(key)) {
                setGlobal({
                  terms: terms?.filter(({ value }) => value !== key),
                })
              } else {
                setGlobal({
                  terms: [...new Set([...terms, { field, boost, value: key, filterId }])],
                })
              }
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Tooltip title={key?.toUpperCase()} placement="top">
            <Typography
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginRight: theme.spacing(2),
              }}
              variant="overline"
            >{`${typeof key === 'string' ? key.toUpperCase() : key} (${doc_count})`}</Typography>
          </Tooltip>
        </div>
      </Grid>
    )
  })
}
