import React from 'react'
import {
  Slider,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
  FormControl,
  Tooltip,
} from '@material-ui/core'
import { debounce } from '../../../../../../lib/fns'
import DateFnsUtils from '@date-io/date-fns'
import { sub, format, parse } from 'date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

const minSlider = 1
const maxSlider = 7300
const dateToString = (dt) => format(dt, 'dd/MM/yyyy')
const getSubtractedDate = (days) => sub(new Date(), { days: Math.abs(days - maxSlider) })
const getDateStringFromInt = (val) => dateToString(getSubtractedDate(val))
const RadioTxt = ({ children }) => <Typography variant="overline">{children}</Typography>

export default ({ updateForm, ...fields }) => {
  return (
    <Grid container item style={{ marginTop: 10 }}>
      <Grid container item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="fixed-date-range"
            name="fixed-date-range"
            value={fields.fixedDateRange}
            onChange={({ target }) =>
              updateForm({
                fixedDateRange: target.value,
                dateRange:
                  target.value === '1mnth'
                    ? [getDateStringFromInt(maxSlider - 30), getDateStringFromInt(maxSlider)]
                    : target.value === '6mnth'
                    ? [getDateStringFromInt(maxSlider - 182), getDateStringFromInt(maxSlider)]
                    : target.value === '1yr'
                    ? [getDateStringFromInt(maxSlider - 365), getDateStringFromInt(maxSlider)]
                    : target.value === '5yr'
                    ? [getDateStringFromInt(maxSlider - 1825), getDateStringFromInt(maxSlider)]
                    : target.value === '10yr'
                    ? [getDateStringFromInt(maxSlider - 3650), getDateStringFromInt(maxSlider)]
                    : target.value === 'all'
                    ? [null, null]
                    : fields.dateRange,
                _dateRange:
                  target.value === '1mnth'
                    ? [maxSlider - 30, maxSlider]
                    : target.value === '6mnth'
                    ? [maxSlider - 182, maxSlider]
                    : target.value === '1yr'
                    ? [maxSlider - 365, maxSlider]
                    : target.value === '5yr'
                    ? [maxSlider - 1825, maxSlider]
                    : target.value === '10yr'
                    ? [maxSlider - 3650, maxSlider]
                    : fields._dateRange,
              })
            }
          >
            <FormControlLabel
              value="10yr"
              control={<Radio ize="small" />}
              label={<RadioTxt>10 Year</RadioTxt>}
            />
            <FormControlLabel
              value="5yr"
              control={<Radio ize="small" />}
              label={<RadioTxt>5 Year</RadioTxt>}
            />{' '}
            <FormControlLabel
              value="1yr"
              control={<Radio ize="small" />}
              label={<RadioTxt>1 Year</RadioTxt>}
            />
            <FormControlLabel
              value="6mnth"
              control={<Radio ize="small" />}
              label={<RadioTxt>6 Month</RadioTxt>}
            />
            <FormControlLabel
              value="1mnth"
              control={<Radio size="small" />}
              label={<RadioTxt>1 Month</RadioTxt>}
            />
            <FormControlLabel
              value="all"
              control={<Radio ize="small" />}
              label={<RadioTxt>All Dates</RadioTxt>}
            />
            <FormControlLabel
              value="custom"
              control={<Radio ize="small" />}
              label={<RadioTxt>custom</RadioTxt>}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {fields.fixedDateRange === 'custom' ? (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="dense"
                id="date-picker-inline-1"
                label="From:"
                value={
                  fields.dateRange[0]
                    ? parse(fields.dateRange[0], 'dd/MM/yyyy', new Date())
                    : new Date()
                }
                onChange={(date) =>
                  updateForm({ dateRange: [dateToString(date), fields.dateRange[1]] })
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="dense"
                id="date-picker-inline-2"
                label="To:"
                value={
                  fields.dateRange[1]
                    ? parse(fields.dateRange[1], 'dd/MM/yyyy', new Date())
                    : new Date()
                }
                onChange={(date) =>
                  updateForm({ dateRange: [fields.dateRange[0], dateToString(date)] })
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        ) : (
          <Slider
            disabled={fields.fixedDateRange === 'all' ? true : false}
            ValueLabelComponent={({ children, open, value }) => (
              <Tooltip
                disableFocusListener
                disableHoverListener
                disableTouchListener
                open={open}
                enterTouchDelay={0}
                placement="top"
                title={value}
              >
                {children}
              </Tooltip>
            )}
            onChange={debounce((e, v) => updateForm({ _dateRange: v }))}
            onChangeCommitted={(e, v) =>
              updateForm({
                dateRange: [getDateStringFromInt(v[0]), getDateStringFromInt(v[1])],
              })
            }
            value={fields._dateRange}
            min={minSlider}
            max={maxSlider}
            getAriaValueText={getDateStringFromInt}
            valueLabelFormat={getDateStringFromInt}
            valueLabelDisplay="auto"
            aria-labelledby="date-range-slider"
          />
        )}
      </Grid>
    </Grid>
  )
}
