// http://paletton.com/
var colorPalette = [
  '#37598B',
  '#839CC3',
  '#5473A1',
  '#224477',
  '#10305E',
  '#D3B647',
  '#FFECA3',
  '#F5DB73',
  '#B59826',
  '#8F750D',
  '#D37E47',
  '#FFC7A3',
  '#F5A673',
  '#B55F26',
  '#8F400D',
]

export default {
  color: colorPalette,
  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#008acd',
    },
  },

  visualMap: {
    itemWidth: 15,
    color: ['#5ab1ef', '#e0ffff'],
  },
  //https://echarts.apache.org/en/option.html#toolbox
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: colorPalette[0],
      },
    },
    feature: {
      saveAsImage: {},
      dataView: {
        readOnly: true,
        title: 'View data',
        lang: ['Data View', 'Back', 'Refresh'],
      },
      magicType: {
        type: ['line', 'bar'],
        title: { line: 'View as line chart', bar: 'View as bar chart' },
        // title: [',View as line chart', 'View as bar chart'],
      },
    },
  },
  legend: { type: 'scroll', orient: 'vertical', left: 'right', top: 40 },
  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.5)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#008acd',
      },
      crossStyle: {
        color: '#008acd',
      },
      shadowStyle: {
        color: 'rgba(200,200,200,0.2)',
      },
    },
  },
  dataZoom: [
    {
      handleColor: '#008acd',
      height: '4%',
    },
    {
      type: 'inside',
    },
  ],
  // series:{
  label: {
    color: '#37598B',
    // }
  },
  grid: {
    borderColor: '#eee',
  },

  categoryAxis: {
    axisLine: {
      lineStyle: {
        // color: '#008acd',
        color: '#10305E',
      },
    },
    splitLine: {
      lineStyle: {
        color: ['#eee'],
      },
    },
  },

  valueAxis: {
    axisLine: {
      lineStyle: {
        // color: '#008acd',
        color: '#10305E',
      },
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)'],
      },
    },
    splitLine: {
      lineStyle: {
        color: ['#eee'],
      },
    },
  },

  timeline: {
    lineStyle: {
      color: '#008acd',
    },
    controlStyle: {
      normal: { color: '#008acd' },
      emphasis: { color: '#008acd' },
    },
    symbol: 'emptyCircle',
    symbolSize: 3,
  },

  line: {
    smooth: true,
    symbol: 'emptyCircle',
    symbolSize: 3,
  },

  candlestick: {
    itemStyle: {
      normal: {
        color: '#d87a80',
        color0: '#2ec7c9',
        lineStyle: {
          color: '#d87a80',
          color0: '#2ec7c9',
        },
      },
    },
  },

  scatter: {
    symbol: 'circle',
    symbolSize: 4,
  },

  map: {
    label: {
      normal: {
        textStyle: {
          color: '#d87a80',
        },
      },
    },
    itemStyle: {
      normal: {
        borderColor: '#eee',
        areaColor: '#ddd',
      },
      emphasis: {
        areaColor: '#fe994e',
      },
    },
  },

  graph: {
    color: colorPalette,
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, '#2ec7c9'],
          [0.8, '#5ab1ef'],
          [1, '#d87a80'],
        ],
        width: 10,
      },
    },
    axisTick: {
      splitNumber: 10,
      length: 15,
      lineStyle: {
        color: 'auto',
      },
    },
    splitLine: {
      length: 22,
      lineStyle: {
        color: 'auto',
      },
    },
    pointer: {
      width: 5,
    },
  },
}
