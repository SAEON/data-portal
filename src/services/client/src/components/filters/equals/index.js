export default {
  type: 'equals', // NOTE - this value must also be defined on the ChartType enum in the API

  /**
   * This is for reducing the amount of data saved
   * Discards unused columns. Note tha columns required
   * for filtering shoulg NOT be filtered out
   */
  filter: data => data.filter(entry => entry === equalsValue),
  //   saveFilter: (data, config) => {
  //     const cols = [config['series-names'], config['series-values']]
  //     return data.map(row => {
  //       return Object.fromEntries(Object.entries(row).filter(([k]) => cols.includes(k)))
  //     })
  //   },

  /**
   * Define a list of form components
   * The values are passed to your chart in the {config} param
   */
  config: [],

  /**
   * The component should use the config
   * parameter that is determined by the
   * config field above
   */
  //   getComponent: () => import('./'),
}
