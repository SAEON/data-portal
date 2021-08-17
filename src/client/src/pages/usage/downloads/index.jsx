import { useContext } from 'react'
import { context as downloadsContext } from './context'
import Collapse from '../../../components/collapse'
import CardContent from '@material-ui/core/CardContent'
import Icon from 'mdi-react/ChartPieIcon'
import ReactECharts from 'echarts-for-react'
import theme from '../../../lib/echarts-theme.js'

export default () => {
  const { downloads } = useContext(downloadsContext)

  const data = downloads.reduce((a, c) => {
    let { referrer, date, id, count } = c
    referrer = referrer || 'UNKNOWN'

    let _referrer = a.find(({ name }) => name === referrer)

    if (!_referrer) {
      _referrer = { name: referrer, children: [] }
      a.push(_referrer)
    }

    let _date = _referrer.children.find(({ name }) => name === date)

    if (!_date) {
      _date = { name: date, children: [], value: count }
      _referrer.children.push(_date)
    } else {
      _date.value += count
    }

    let _id = _date.children.find(({ name }) => name === id)

    if (!_id) {
      _id = { name: id, value: count }
      _date.children.push(_id)
    } else {
      _id.value += count
    }

    return a
  }, [])

  return (
    <Collapse Icon={Icon} title="by Referrer">
      <CardContent>
        <div style={{ height: 700 }}>
          <ReactECharts
            theme={theme}
            style={{ height: '100%' }}
            option={{
              visualMap: {
                type: 'continuous',
                min: 0,
                max: 10,
                inRange: {
                  color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862'],
                },
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
              },
              series: {
                type: 'sunburst',
                data,
                radius: [0, '95%'],
                label: {
                  show: false,
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Collapse>
  )
}
