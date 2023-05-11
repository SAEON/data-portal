import { useContext, forwardRef } from 'react'
import Grid from '@mui/material/Grid'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { Div as Div_ } from '../../../../../../components/html-tags'
import { styled } from '@mui/material/styles'
import Typography_ from '@mui/material/Typography'
import { context as searchContext } from '../../../../../../contexts/search'

const Div = styled(Div_)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flexDirection: 'column',
}))

const DatePicker = styled(props => (
  <StaticDatePicker
    disableHighlightToday
    yearsPerRow={4}
    monthsPerRow={4}
    disableFuture
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPickersToolbar-root': {
    display: 'none',
  },
  '& .MuiDialogActions-root': {
    display: 'none',
  },
  '& .MuiPickersCalendarHeader-labelContainer': {
    '& .MuiPickersCalendarHeader-label': {
      fontSize: '0.8rem',
      '& .MuiIconButton-root': {
        padding: 0,
      },
    },
  },
  '& .MuiYearCalendar-root': {
    button: {
      fontSize: '0.8rem',
    },
  },
}))

const Typography = styled(props => <Typography_ variant="body2" {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  textAlign: 'center',
  padding: theme.spacing(1),
  margin: theme.spacing(2),
}))

export default forwardRef(({ results, filterId, field, boost, contexts }, ref) => {
  const { global, setGlobal } = useContext(searchContext)
  const {
    temporalRange: { from, to },
  } = global

  return (
    <Grid container item xs={12} spacing={0}>
      <Div sx={{ marginTop: t => t.spacing(1) }}>
        <Typography>From</Typography>
        <DatePicker
          value={from}
          shouldDisableDate={from => to && from >= to}
          onChange={from =>
            setGlobal({
              temporalRange: {
                from,
                to,
              },
            })
          }
          label="From"
        />
      </Div>
      <Div>
        <Typography>To</Typography>
        <DatePicker
          shouldDisableDate={to => from && to <= from}
          value={to}
          onChange={to =>
            setGlobal({
              temporalRange: {
                from,
                to,
              },
            })
          }
          label="To"
        />
      </Div>
    </Grid>
  )
})
