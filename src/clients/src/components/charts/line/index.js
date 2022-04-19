import Autocomplete from '../../../components/autocomplete'
import DropdownSelect from '../../../components/dropdown-select'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import DeleteIcon from '@mui/icons-material/Delete'

export default {
  type: 'LINE', // NOTE - this value must also be defined on the ChartType enum in the API

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
      id: 'series-names',
      description: 'Select column containing series names (x-axis)',
      Component: ({ data, value, setValue }) => {
        return (
          <Autocomplete
            id="chart-select-series-names-columns"
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
                      size="large"
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
                size="large"
              >
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </>
        )
      },
    },
    // {
    //   id: 'series-markline-1',
    //   description: 'Name and quantify first line marking',
    //   Component: ({ value, setValue }) => {
    //     return (
    //       <>
    //         <TextField
    //           id="line-chart-select-markline-1-name"
    //           label="Name (e.g. Expected Value)"
    //           autoFocus
    //           size="small"
    //           fullWidth
    //           onChange={event => setValue({ name: event.target.value, value: value?.value })}
    //           value={value?.name}
    //         />
    //         <TextField
    //           id="line-chart-select-target-1-value"
    //           label="Value (Numeric)"
    //           autoFocus
    //           size="small"
    //           onChange={event => {
    //             setValue({ name: value?.name, value: event.target.value })
    //           }}
    //           value={value?.value}
    //           type="number"
    //         />
    //       </>
    //     )
    //   },
    // },
    // {
    //   id: 'series-markline-2',
    //   description: 'Name and quantify second line marking',
    //   Component: ({ value, setValue }) => {
    //     return (
    //       <>
    //         <TextField
    //           id="line-chart-select-target-2-name"
    //           label="Name (e.g. Expected Value)"
    //           autoFocus
    //           size="small"
    //           fullWidth
    //           onChange={event => {
    //             setValue({ name: event.target.value, value: value?.value })
    //           }}
    //           value={value?.name}
    //         />
    //         <TextField
    //           id="line-chart-select-target-2-value"
    //           label="Value (Numeric)"
    //           autoFocus
    //           size="small"
    //           onChange={event => {
    //             setValue({ name: value?.name, value: event.target.value })
    //           }}
    //           value={value?.value}
    //           type="number"
    //         />
    //       </>
    //     )
    //   },
    // },
  ],

  /**
   * The component should use the config
   * parameter that is determined by the
   * config field above
   */
  getComponent: () => import('./chart'),
}
