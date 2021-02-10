import ReactEcharts from 'echarts-for-react'
import theme from '../../../../lib/echarts-theme'

export default ({ config, data, title, description }) => {
  const namesField = config['series-names']
  const valuesFields = config['series-values']
  const quickOptions = config['series-quick-options']

  return <ReactEcharts theme={theme} option={{}} />
}
