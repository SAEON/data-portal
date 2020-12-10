import Autocomplete from '../../../components/autocomplete'
import { TextField } from '@material-ui/core'

export default {
  type: 'BAR', // NOTE - this value must also be defined on the ChartType enum in the API

  /**
   * This is for reducing the amount of data saved
   * Discards unused columns. Note tha columns required
   * for filtering shoulg NOT be filtered out
   */
  saveFilter: (data, config) => {
    const cols = [config['series-names'], config['series-values']]
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
      description: 'Select column containing series values',
      Component: ({ data, value, setValue }) => {
        return (
          <Autocomplete
            id="bar-chart-select-series-values-columns"
            options={Object.keys(data[0])}
            selectedOptions={value}
            setOption={setValue}
          />
        )
      },
    },
    {
      id: 'series-markline-1',
      description: 'Name and quantify first line marking',
      Component: ({ data, value, setValue }) => {
        return (
          <>
            <TextField
              id="bar-chart-select-markline-1-name"
              label="Name (e.g. Expected Value)"
              autoFocus
              size="small"
              fullWidth
              onChange={event => setValue({ name: event.target.value, value: value?.value })}
              value={value?.name}
            />
            <TextField
              id="bar-chart-select-target-1-value"
              label="Value (Numeric)"
              autoFocus
              size="small"
              onChange={event => {
                setValue({ name: value?.name, value: event.target.value })
              }}
              value={value?.value}
              type="number"
            />
          </>
        )
      },
    },
    {
      id: 'series-markline-2',
      description: 'Name and quantify second line marking',
      Component: ({ data, value, setValue }) => {
        return (
          <>
            <TextField
              id="bar-chart-select-target-2-name"
              label="Name (e.g. Expected Value)"
              autoFocus
              size="small"
              fullWidth
              onChange={event => {
                setValue({ name: event.target.value, value: value?.value })
              }}
              value={value?.name}
            />
            <TextField
              id="bar-chart-select-target-2-value"
              label="Value (Numeric)"
              autoFocus
              size="small"
              label=""
              onChange={event => {
                setValue({ name: value?.name, value: event.target.value })
              }}
              value={value?.value}
              type="number"
            />
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
