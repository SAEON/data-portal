import { forwardRef } from 'react'
import Grid from '@mui/material/Grid'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { Div } from '../../../../../../components/html-tags'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const D = styled(Div)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flexDirection: 'column',
}))

const DatePicker_ = styled(StaticDatePicker)(({ theme }) => ({
  '& .MuiPickersToolbar-root': {
    display: 'none',
  },
  '& .MuiDialogActions-root': {
    display: 'none',
  },
}))

const T = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  textAlign: 'center',
  padding: theme.spacing(1),
  margin: theme.spacing(2),
}))

const DatePicker = props => (
  <DatePicker_ disableHighlightToday yearsPerRow={4} monthsPerRow={4} disableFuture {...props} />
)

export default forwardRef(({ results, activeFilters, filterId, field, boost, contexts }, ref) => {
  return (
    <Grid container item xs={12} spacing={0}>
      <D sx={{ marginTop: t => t.spacing(1) }}>
        <T>From</T>
        <DatePicker label="From" />
      </D>
      <D>
        <T>To</T>
        <DatePicker label="To" />
      </D>
    </Grid>
  )
})
