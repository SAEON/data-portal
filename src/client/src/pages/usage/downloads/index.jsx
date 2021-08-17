import { useContext } from 'react'
import { context as downloadsContext } from './context'
import Collapse from '../../../components/collapse'
import CardContent from '@material-ui/core/CardContent'
import Icon from 'mdi-react/ChartPieIcon'
import ReactECharts from 'echarts-for-react'
import theme from '../../../lib/echarts-theme.js'

var bgColor = '#2E2733'

const otherData = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          {
            name: 'Cousin Jack',
            value: 2,
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2,
              },
            ],
          },
          {
            name: 'Cousin Ben',
            value: 4,
          },
        ],
      },
      {
        name: 'Aunt Jane',
        children: [
          {
            name: 'Cousin Kate',
            value: 4,
          },
        ],
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5,
            itemStyle: {
              color: 'red',
            },
          },
          {
            name: 'Brother Peter',
            value: 1,
          },
        ],
      },
    ],
  },
  {
    name: 'Mike',
    children: [
      {
        name: 'Uncle Dan',
        children: [
          {
            name: 'Cousin Lucy',
            value: 3,
          },
          {
            name: 'Cousin Luck',
            value: 4,
            children: [
              {
                name: 'Nephew',
                value: 2,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1,
          },
          {
            name: 'Cousin Jenny',
            value: 2,
          },
        ],
      },
    ],
  },
]

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
