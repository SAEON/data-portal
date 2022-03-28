import Autocomplete from '../../../components/autocomplete'
import DropdownSelect from '../../../components/dropdown-select'

export default {
  type: 'CUSTOM', // NOTE - this value must also be defined on the ChartType enum in the API

  /**
   * This is for reducing the amount of data saved
   * Discards unused columns. Note tha columns required
   * for filtering should NOT be filtered out
   */
  saveFilter: (data, config) => {
    const cols = config['series-data']
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
      id: 'series-data',
      description: 'Select column(s) containing required data',
      Component: ({ data, value, setValue }) => {
        return (
          <>
            <DropdownSelect
              id="chart-select-series-data"
              options={Object.keys(data[0])}
              selectedOptions={value || []}
              setOption={setValue}
            />
          </>
        )
      }
    }
  ],

  /**
   * The component should use the config
   * parameter that is determined by the
   * config field above
   */
  getComponent: () => import('./chart')
}
