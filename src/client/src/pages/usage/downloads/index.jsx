import { useContext } from 'react'
import { context as downloadsContext } from './context'
import Collapse from '../../../components/collapse'
import CardContent from '@material-ui/core/CardContent'
import Icon from 'mdi-react/ChartPieIcon'
import ReactECharts from 'echarts-for-react'
import theme from '../../../lib/echarts-theme.js'

export default () => {
  const { downloads } = useContext(downloadsContext)
  console.log('downloads', downloads)

  const data = downloads.reduce((a, c) => {
    const { referrer, date, clientIpLocation, count } = c
    if (!a[referrer]) {
      a[referrer] = {}
    }

    if (!a[referrer][date]) {
      a[referrer][date] = {}
    }

    if (!a[referrer][date][clientIpLocation]) {
      a[referrer][date][clientIpLocation] = {
        value: count,
      }
    }

    a[referrer][date][clientIpLocation].value = a[referrer][date][clientIpLocation].value + count

    return a
  }, {})

  console.log('data', data)

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
              series: {
                type: 'sunburst',
                data: [
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
                ],
                radius: [0, '90%'],
                label: {
                  rotate: 'radial',
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Collapse>
  )
}
