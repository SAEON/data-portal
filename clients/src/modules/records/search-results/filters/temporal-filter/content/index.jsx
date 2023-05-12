import { useContext, forwardRef } from 'react'
import Grid from '@mui/material/Grid'
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { Div } from '../../../../../../components/html-tags'
import { styled } from '@mui/material/styles'
import Typography_ from '@mui/material/Typography'
import { context as searchContext } from '../../../../../../contexts/search'
import Button from '@mui/material/Button'

const PickerContainer = styled(Div)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flexDirection: 'column',
  margin: theme.spacing(2),
}))

const DatePicker = styled(({ isWithinSelection, ...props }) => (
  <Picker
    slotProps={{
      field: {
        readOnly: true,
      },
      textField: {
        size: 'small',
        fullWidth: true,
        margin: 'none',
      },
      openPickerButton: {
        size: 'small',
      },
      openPickerIcon: {
        fontSize: 'small',
      },
    }}
    slots={{
      day: props => (
        <PickersDay
          disableMargin={false}
          sx={theme => ({
            borderRadius: 0,
            backgroundColor: isWithinSelection(props.day) ? `${theme.palette.grey[50]}` : 'inherit',
          })}
          {...props}
        />
      ),
    }}
    disableHighlightToday
    yearsPerRow={4}
    monthsPerRow={4}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiInputBase-root': {
    paddingRight: theme.spacing(1),
  },
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
  textAlign: 'center',
}))

const Header = styled(props => <Div {...props}></Div>)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
}))

const isWithinRange = (day, from, to) => {
  if (from && to) {
    return day >= from && to >= day
  } else if (from) {
    return day >= from
  } else if (to) {
    return to >= day
  }

  return false
}

export default forwardRef(({ filterId }, ref) => {
  const { global, setGlobal } = useContext(searchContext)
  let {
    filter: { temporalRange: { from: _from = null, to: _to = null } = {} } = {},
    temporalRange: { from, to },
  } = global

  if (_from) {
    _from = new Date(_from)
    from = from ? (from > _from ? from : _from) : _from
  }

  if (_to) {
    _to = new Date(_to)
    to = to ? (to < _to ? to : _to) : _to
  }

  return (
    <Grid ref={ref} container item xs={12} spacing={0}>
      <PickerContainer sx={{ marginTop: t => t.spacing(1) }}>
        <DatePicker
          isWithinSelection={day => isWithinRange(day, from, to)}
          value={from}
          shouldDisableDate={date => {
            if (_from) {
              if (date < _from) return true
            }
            if (to) {
              if (date > to) return true
            }

            return false
          }}
          onChange={value => {
            ref.current.dispatchEvent(
              new CustomEvent('searchFilter', {
                detail: { id: filterId, context: 'from', value },
              })
            )
            setGlobal({
              temporalRange: {
                from: value,
                to,
              },
            })
          }}
          label="Start Date"
        />
      </PickerContainer>
      <PickerContainer sx={{ mt: theme => theme.spacing(1) }}>
        <DatePicker
          isWithinSelection={day => isWithinRange(day, from, to)}
          shouldDisableDate={date => {
            if (_to) {
              if (date > _to) return true
            }

            if (from) {
              if (date < from) return true
            }

            return false
          }}
          value={to}
          onChange={value => {
            ref.current.dispatchEvent(
              new CustomEvent('searchFilter', {
                detail: { id: filterId, context: 'to', value },
              })
            )
            setGlobal({
              temporalRange: {
                from,
                to: value,
              },
            })
          }}
          label="End Date"
        />
      </PickerContainer>
      <Button
        disableElevation
        onClick={() => {
          ref.current.dispatchEvent(
            new CustomEvent('searchFilter', {
              detail: { id: filterId, context: 'reset' },
            })
          )
          setGlobal({
            temporalRange: {
              from: null,
              to: null,
            },
          })
        }}
        sx={theme => ({
          mb: theme.spacing(2),
          mr: theme.spacing(2),
          ml: 'auto',
        })}
        size="small"
        color="primary"
        disabled={!from && !to}
        variant="text"
      >
        Clear selection
      </Button>
    </Grid>
  )
})
