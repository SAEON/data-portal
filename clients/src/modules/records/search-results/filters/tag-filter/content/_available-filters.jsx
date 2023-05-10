import { useContext, forwardRef } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import { context as searchContext } from '../../../../../../contexts/search'
import { Div, Span } from '../../../../../../components/html-tags'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const makeFilter = ({ terms, field, boost, value, filterId, context }) => ({
  terms: [...new Set([...terms, { field, boost, value, filterId, context }])],
})

export default forwardRef(
  (
    { showAll, results, LIST_SIZE, activeFilters, contexts = ['exact'], field, boost, filterId },
    ref
  ) => {
    const { global, setGlobal } = useContext(searchContext)
    const { terms } = global

    const availableFilters = showAll ? results : results.slice(0, LIST_SIZE + activeFilters.length)

    return availableFilters.map(({ key, doc_count, top_reverse_nested }) => {
      doc_count = `${top_reverse_nested?.doc_count || doc_count}`
      key = typeof key === 'number' ? `${key}` : key

      // Don't show filters that are already selected
      if ((activeFilters?.map(({ value }) => value) || []).includes(key.toString())) {
        return null
      }

      const checked = activeFilters?.map(({ value }) => value)?.includes(key) ? true : false

      const renderContexts = Boolean(contexts.filter(Boolean).filter(c => c !== 'exact').length)

      return (
        <Grid key={key} item xs={12}>
          <Div
            ref={ref}
            sx={{
              pl: theme => theme.spacing(1),
              display: 'flex',
              alignItems: 'center',
              flexDirection: renderContexts ? 'row-reverse' : 'inherit',
              justifyContent: renderContexts ? 'space-between' : 'inherit',
              '& .context-hover-target': {
                opacity: 0.3,
              },
              '&:hover': {
                '& .context-hover-target': {
                  opacity: 1,
                },
              },
            }}
          >
            <Div
              className="context-hover-target"
              sx={{
                mr: theme => (renderContexts ? theme.spacing(2) : 'inherit'),
                display: 'flex',
                transition: theme =>
                  theme.transitions.create(['opacity'], {
                    duration: theme.transitions.duration.shortest,
                  }),
              }}
            >
              {contexts
                .filter(c => c !== 'exact')
                .map((context, i) => {
                  return (
                    <FormGroup key={context || i}>
                      <FormControlLabel
                        labelPlacement="start"
                        control={
                          <Checkbox
                            size="small"
                            sx={{
                              alignSelf: 'baseline',
                              '& .MuiSvgIcon-root': { fontSize: 16 },
                            }}
                            color="primary"
                            checked={checked}
                            onChange={() => {
                              if (activeFilters?.map(({ value }) => value)?.includes(key)) {
                                setGlobal({
                                  terms: terms?.filter(({ value }) => value !== key),
                                })
                              } else {
                                ref.current.dispatchEvent(
                                  new CustomEvent('searchFilter', {
                                    detail: { id: filterId, context, value: key },
                                  })
                                )
                                setGlobal(
                                  makeFilter({
                                    terms,
                                    field,
                                    boost,
                                    value: key,
                                    filterId,
                                    context,
                                  })
                                )
                              }
                            }}
                            inputProps={{ 'aria-label': 'Toggle filter', 'aria-checked': checked }}
                          />
                        }
                        label={
                          <Typography sx={{ fontStyle: 'italic' }} variant="caption">
                            {context.capitalize()}
                          </Typography>
                        }
                      />
                    </FormGroup>
                  )
                })}
            </Div>
            {contexts
              .filter(ctx => ctx === 'exact')
              .map(context => (
                <Div
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                  key={context}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      alignSelf: 'baseline',
                      '& .MuiSvgIcon-root': { fontSize: 16 },
                    }}
                    color="primary"
                    checked={checked}
                    onChange={() => {
                      if (activeFilters?.map(({ value }) => value)?.includes(key)) {
                        setGlobal({
                          terms: terms?.filter(({ value }) => value !== key),
                        })
                      } else {
                        setGlobal(
                          makeFilter({
                            terms,
                            field,
                            boost,
                            value: key,
                            filterId,
                            context,
                          })
                        )
                        ref.current.dispatchEvent(
                          new CustomEvent('searchFilter', {
                            detail: { id: filterId, context, value: key },
                          })
                        )
                      }
                    }}
                    inputProps={{ 'aria-label': 'Toggle filter', 'aria-checked': checked }}
                  />
                  <Tooltip
                    title={`${typeof key === 'string' ? key.toUpperCase() : key} (${doc_count})`}
                    placement="top"
                  >
                    <Typography
                      component={Span}
                      onClick={() => {
                        if (activeFilters?.map(({ value }) => value)?.includes(key)) {
                          setGlobal({
                            terms: terms?.filter(({ value }) => value !== key),
                          })
                        } else {
                          setGlobal(
                            makeFilter({
                              terms,
                              field,
                              boost,
                              value: key,
                              filterId,
                              context,
                            })
                          )
                        }
                      }}
                      sx={{
                        cursor: 'pointer',
                        lineHeight: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        mr: theme => (renderContexts ? 'inherit' : theme.spacing(2)),
                      }}
                      variant="caption"
                    >{`${
                      typeof key === 'string' ? key.toUpperCase() : key
                    } (${doc_count})`}</Typography>
                  </Tooltip>
                </Div>
              ))}
          </Div>
        </Grid>
      )
    })
  }
)
