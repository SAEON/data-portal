import { useEffect } from 'react'
import Autocomplete from '../../../components/autocomplete'
import DropdownSelect from '../../../components/dropdown-select'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import DeleteIcon from '@material-ui/icons/Delete'

export default {
  type: 'BAR', // NOTE - this value must also be defined on the ChartType enum in the API

  /**
   * This is for reducing the amount of data saved
   * Discards unused columns. Note tha columns required
   * for filtering shoulg NOT be filtered out
   */
  saveFilter: (data, config) => {
    const cols = [config['series-names'], ...config['series-values']]
    return data.map(row => {
      return Object.fromEntries(Object.entries(row).filter(([k]) => cols.includes(k)))
    })
  },

  /**
   * Define a list of form components
   * The values are passed to your chart in the {config} param
   */
  config: [
    {
      id: 'series-quick-options',
      description: 'Quick Options',
      Component: ({ data, value, setValue }) => {
        useEffect(() => {
          //on component mount
          setValue({ isVertical: true })
          return () => {}
        }, [])
        return (
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value ? value.isVertical : true}
                    onChange={() => {
                      let valueCopy = JSON.parse(JSON.stringify(value))
                      valueCopy.isVertical = !value.isVertical
                      setValue(valueCopy)
                    }}
                    color="primary"
                  />
                }
                label="Vertically Oriented"
              />
            </FormGroup>
          </FormControl>
        )
      },
    },
    {
      id: 'series-names',
      description: 'Select column containing series names',
      Component: ({ data, value, setValue }) => {
        return (
          <Autocomplete
            id="bar-chart-select-series-names-columns"
            options={Object.keys(data[0])}
            selectedOptions={value}
            setOption={setValue}
          />
        )
      },
    },
    {
      id: 'series-values',
      description: 'Select column(s) containing series values (y-axis)',
      Component: ({ data, value, setValue }) => {
        return (
          <>
            <DropdownSelect
              id="chart-select-series-names-columns"
              options={Object.keys(data[0])}
              selectedOptions={value || []}
              setOption={setValue}
            />
          </>
        )
      },
    },
    {
      id: 'series-marklines',
      description: 'Marklines',
      Component: ({ value, setValue }) => {
        return (
          <>
            {value?.map((markline, i) => {
              return (
                <Grid key={i} container justifyContent="space-between">
                  <Grid item xs={10} style={{ marginBottom: '30px' }}>
                    <TextField
                      id={`chart-select-markline-${i}-name`}
                      label="Name (e.g. Expected Value)"
                      autoFocus
                      size="small"
                      fullWidth
                      onChange={event => {
                        const newName = event.target.value
                        let marklineCopy = JSON.parse(JSON.stringify(markline))
                        marklineCopy.name = newName
                        let valueCopy = value
                        valueCopy[i] = marklineCopy
                        setValue(valueCopy)
                      }}
                      value={markline?.name || ''}
                    />
                    <TextField
                      id={`chart-select-markline-${i}-value`}
                      label="Value (Numeric)"
                      autoFocus
                      size="small"
                      fullWidth
                      onChange={event => {
                        const newValue = event.target.value
                        let marklineCopy = JSON.parse(JSON.stringify(markline))
                        marklineCopy.value = newValue
                        let valueCopy = value
                        valueCopy[i] = marklineCopy
                        setValue(valueCopy)
                      }}
                      value={markline?.value || ''}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={2} style={{ margin: 'auto', textAlign: 'end' }}>
                    <IconButton
                      onClick={() => {
                        var valueCopy = value
                        valueCopy.splice(i, 1)
                        setValue(valueCopy)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                  <Grid item key={i} xs={12}>
                    <Divider light variant="middle" />
                  </Grid>
                </Grid>
              )
            })}
            <Grid item xs={12}>
              <IconButton
                onClick={() => {
                  if (value === undefined) setValue([{ name: undefined, value: undefined }])
                  else setValue([...value, { name: undefined, value: undefined }])
                }}
              >
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </>
        )
      },
    },
  ],

  /**
   * The component should use the config
   * parameter that is determined by the
   * config field above
   */
  getComponent: () => import('./chart'),
}
