import ReactEcharts from 'echarts-for-react'
import theme from '../../../../theme/echarts'
import VirtualTable from './../../../../components/virtual-table'
export default ({ config, data, title, description }) => {
  return <VirtualTable data={data} />
  // return <ReactEcharts theme={theme} option={{}} />
}
