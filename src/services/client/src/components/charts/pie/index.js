import Autocomplete from '../../../components/autocomplete'

export default {
  type: 'PIE', // NOTE - this value must also be defined on the ChartType enum in the API
  form: [
    {
      id: 'series-name',
      description: 'Select column containing series names',
      Component: ({ data, value, setValue }) => {
        return (
          <Autocomplete
            id="pie-chart-select-series-names-columns"
            options={Object.keys(data[0])}
            selectedOptions={value}
            setOption={val => setValue(val)}
          />
        )
      },
    },
  ],
  Component: () => import('./chart').then(({ default: fn }) => fn),
}
