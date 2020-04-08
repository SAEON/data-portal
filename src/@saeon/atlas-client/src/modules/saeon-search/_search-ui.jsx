import React from 'react'
import {
  TextField,
  InputAdornment,
  Chip,
  Slider,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Tooltip,
  Button,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Search as SearchIcon, Gesture as GestureIcon } from '@material-ui/icons'
import { Form } from '../../components'
import { MenuContext } from '../menu-provider'
import { debounce } from '../../../../fns-lib'
import { sub, format, parse } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { PolygonSelectionTool } from '../map-tools'

const minSlider = 1
const maxSlider = 7300
const dateToString = (dt) => format(dt, 'dd/MM/yyyy')
const getSubtractedDate = (days) => sub(new Date(), { days: Math.abs(days - maxSlider) })
const getDateStringFromInt = (val) => dateToString(getSubtractedDate(val))
const RadioTxt = ({ children }) => <Typography variant="overline">{children}</Typography>

export default ({ data, children }) => (
  <MenuContext.Consumer>
    {({ addMenu, removeMenu, getMenuById, getActiveMenuZIndex }) => (
      <Form
        selectedDates={[new Date('2014-08-18T21:11:54'), new Date()]}
        fixedDateRange="1yr"
        textSearch=""
        selectedTerms={[]}
        _dateRange={[maxSlider - 365, maxSlider]}
        dateRange={[getDateStringFromInt(maxSlider - 365), getDateStringFromInt(maxSlider)]}
      >
        {({ updateForm, ...fields }) => (
          <div style={{ padding: 20 }}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  id="catalog-search-free-text"
                  placeholder="e.g. atmospheric, water, etc."
                  label="Text search"
                  autoComplete="off"
                  value={fields.textSearch}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={({ target }) => updateForm({ textSearch: target.value })}
                />

                <Autocomplete
                  getOptionSelected={(a, b) => a.key === b.key}
                  onChange={(e, value) => updateForm({ selectedTerms: value.map((v) => v.key) })}
                  multiple
                  autoHighlight
                  size="small"
                  style={{ width: '100%', marginTop: 10 }}
                  id="catalog-search-tagged-search"
                  options={data.aggregations.subjects.buckets.map(({ key, doc_count }) => ({
                    key: key.trim(),
                    doc_count,
                  }))}
                  getOptionLabel={(option) => option.key}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        size="small"
                        color="secondary"
                        label={option.key}
                        {...getTagProps({ index })}
                        disabled={false}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Term search"
                      variant="outlined"
                      placeholder="start typing..."
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider variant="fullWidth" style={{ marginTop: 20, marginBottom: 20 }} />
              </Grid>

              <Grid item xs={12}>
                <Button
                  color="default"
                  disableElevation
                  size="small"
                  onClick={() => {
                    const id = 'map-selection-tools'
                    if (getMenuById(id)) {
                      removeMenu(id)
                    } else {
                      addMenu({
                        id,
                        zIndex: getActiveMenuZIndex(),
                        Component: () => (
                          <PolygonSelectionTool id={id} onClose={() => removeMenu(id)} />
                        ),
                      })
                    }
                  }}
                  variant="outlined"
                  startIcon={<GestureIcon />}
                >
                  Select area
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Divider variant="fullWidth" style={{ marginTop: 20, marginBottom: 20 }} />
              </Grid>

              {/* Date range */}
              <Grid container item style={{ marginTop: 10 }}>
                <Grid container item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={3} md={2}>
                      <Typography>Date range</Typography>
                    </Grid>
                    <Grid container direction="row" justify="flex-end" item xs={12} sm={9} md={10}>
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
                                  ? [
                                      getDateStringFromInt(maxSlider - 30),
                                      getDateStringFromInt(maxSlider),
                                    ]
                                  : target.value === '6mnth'
                                  ? [
                                      getDateStringFromInt(maxSlider - 182),
                                      getDateStringFromInt(maxSlider),
                                    ]
                                  : target.value === '1yr'
                                  ? [
                                      getDateStringFromInt(maxSlider - 365),
                                      getDateStringFromInt(maxSlider),
                                    ]
                                  : target.value === '5yr'
                                  ? [
                                      getDateStringFromInt(maxSlider - 1825),
                                      getDateStringFromInt(maxSlider),
                                    ]
                                  : target.value === '10yr'
                                  ? [
                                      getDateStringFromInt(maxSlider - 3650),
                                      getDateStringFromInt(maxSlider),
                                    ]
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
                            value="custom"
                            control={<Radio ize="small" />}
                            label={<RadioTxt>custom</RadioTxt>}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
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
                          value={parse(fields.dateRange[0], 'dd/MM/yyyy', new Date())}
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
                          value={parse(fields.dateRange[1], 'dd/MM/yyyy', new Date())}
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

              {/* Callback with search definition as arguments */}
              {children({ ...fields })}
            </Grid>
          </div>
        )}
      </Form>
    )}
  </MenuContext.Consumer>
)
