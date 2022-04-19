import Autocomplete from '../../../components/autocomplete'

export default {
  type: 'MAP', // NOTE - this value must also be defined on the ChartType enum in the API

  /**
   * This is for reducing the amount of data saved
   * Discards unused columns. Note tha columns required
   * for filtering shoulg NOT be filtered out
   */
  saveFilter: (data, config) => {
    const cols = [
      config['series-geo-names'],
      config['series-geo-json'],
      config['series-geo-values'],
    ]
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
      id: 'series-geo-names',
      description: 'Select column containing series geographical names',
      Component: ({ data, value, setValue }) => {
        return (
          <Autocomplete
            id="map-chart-select-series-geo-names-columns"
            options={Object.keys(data[0])}
            selectedOptions={value}
            setOption={setValue}
          />
        )
      },
    },
    {
      id: 'series-geo-values',
      description: 'Select column containing geographical values (Numerical)',
      Component: ({ data, value, setValue }) => {
        return (
          <Autocomplete
            id="bmap-chart-select-series-geo-values-columns"
            options={Object.keys(data[0])}
            selectedOptions={value}
            setOption={setValue}
          />
        )
      },
    },
    {
      id: 'series-geo-json',
      description: 'Select column containing GeoJson values (Geometry)',
      Component: ({ data, value, setValue }) => {
        return (
          <Autocomplete
            id="bmap-chart-select-series-geo-json-columns"
            options={Object.keys(data[0])}
            selectedOptions={value}
            setOption={setValue}
          />
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
