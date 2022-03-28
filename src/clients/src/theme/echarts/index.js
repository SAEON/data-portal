// https://echarts.apache.org/en/theme-builder.html
// http://paletton.com/
var palette = [
  '#2ec7c9',
  '#b6a2de',
  '#5ab1ef',
  '#ffb980',
  '#d87a80',
  '#8d98b3',
  '#e5cf0d',
  '#97b552',
  '#95706d',
  '#dc69aa',
  '#07a2a4',
  '#9a7fd1',
  '#588dd5',
  '#f5994e',
  '#c05050',
  '#59678c',
  '#c9ab00',
  '#7eb00a',
  '#6f5553',
  '#c14089'
]

export default {
  color: palette,
  backgroundColor: 'rgba(0,0,0,0)',
  // textStyle: {},
  title: {
    textStyle: {
      color: '#008acd'
    },
    subtextStyle: {
      color: '#aaaaaa'
    }
  },

  //common chart specifications
  legend: {
    type: 'scroll',
    orient: 'vertical',
    left: 'right',
    top: 40,
    textStyle: {
      color: '#333333'
    }
  },
  tooltip: {
    textStyle: { color: 'white' },
    backgroundColor: 'rgba(50,50,50,0.5)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#008acd',
        width: '1'
      },
      crossStyle: {
        color: '#008acd',
        width: '1'
      }
    }
  },
  dataZoom: [
    {
      type: 'slider',
      selectedDataBackground: {
        // lineStyle: { color: 'rgba(255, 255, 255, 0.1)', opacity: 0.1 },
        // areaStyle: { color: 'rgba(255, 255, 255, 0.1)', opacity: 0.1 },
        lineStyle: { color: 'green', areaStyle: { color: 'blue' } }
      },
      handleColor: '#008acd',
      showDataShadow: false,
      height: '4%',
      // fillerColor: 'red',
      fillerColor: 'rgba(180, 180, 180, 0.2)',
      borderColor: 'rgba(255, 255, 255, 0)'
      // fillerColor: 'rgba(182,162,222,0.2)',
      // backgroundColor: 'rgba(255, 255, 255, 0.1)',
      // backgroundColor: 'rgba(47,69,84,0)',
      // dataBackgroundColor: '#efefff',
      // textStyle: {
      //   color: '#333333',
      // },
    },
    {
      type: 'inside'
    }
  ],
  label: {
    color: '#37598B'
  },
  grid: {
    borderColor: '#eee'
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        // color: '#008acd',
        color: '#10305E'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      rotate: 50,
      align: 'right',
      verticalAlign: 'top',
      position: 'insideBottom',
      distance: -10,
      fontSize: 11,
      color: '#333'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#eee']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#008acd'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      color: '#333'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eee']
      }
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        // color: '#008acd',
        color: '#10305E'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      color: '#333'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eee']
      }
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#008acd'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      color: '#333'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eee']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
      }
    }
  },
  toolbox: {
    feature: {
      saveAsImage: { title: 'Save as image' },
      dataView: {
        readOnly: true,
        title: 'View data',
        lang: ['Data View', 'Back', 'Refresh']
      },
      magicType: {
        type: ['line', 'bar'],
        title: { line: 'View as line chart', bar: 'View as bar chart' }
      }
    }
  },

  timeline: {
    lineStyle: {
      color: '#008acd',
      width: 1
    },
    itemStyle: {
      color: '#008acd',
      borderWidth: 1
    },

    controlStyle: {
      color: '#008acd',
      borderColor: '#008acd',
      borderWidth: 0.5
    },

    checkpointStyle: {
      color: '#2ec7c9',
      borderColor: '#2ec7c9'
    },
    label: {
      color: '#008acd'
    },
    emphasis: {
      controlStyle: {
        color: '#008acd',
        borderColor: '#008acd',
        borderWidth: 0.5
      },
      itemStyle: {
        color: '#a9334c'
      }
    }
  },
  visualMap: {
    color: ['#5ab1ef', '#e0ffff'],
    type: 'continuous',
    // type: 'piecewise',
    left: 'right',
    itemHeight: 200,
    text: ['High', 'Low'],
    calculable: true
  },

  markPoint: {
    label: {
      color: '#eee'
    },
    emphasis: {
      label: {
        color: '#eee'
      }
    }
  },
  //specialised specifications
  line: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    // symbolSize: 3,
    symbol: 'emptyCircle',
    smooth: true,
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value'
    }
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#ccc'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value'
    }
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  map: {
    areaColor: '#dddddd',
    borderColor: '#eeeeee',
    borderWidth: 0.5,
    emphasis: {
      areaColor: 'rgba(254,153,78,1)',
      borderColor: '#444',
      borderWidth: 1
    },
    label: {
      color: '#d87a80'
    },
    feature: {
      saveAsImage: {},
      dataView: {
        readOnly: true,
        title: 'View data',
        lang: ['Data View', 'Back', 'Refresh']
      },
      magicType: {
        type: ['line', 'bar'],
        title: { line: 'View as line chart', bar: 'View as bar chart' }
      }
    }
  },
  radar: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    symbolSize: 3,
    symbol: 'emptyCircle',
    smooth: true
  },

  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  candlestick: {
    itemStyle: {
      color: '#d87a80',
      color0: '#2ec7c9',
      borderColor: '#d87a80',
      borderColor0: '#2ec7c9',
      borderWidth: 1
    }
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    },
    lineStyle: {
      width: 1,
      color: '#aaa'
    },
    symbolSize: 3,
    symbol: 'emptyCircle',
    smooth: true,
    color: palette,
    label: {
      color: '#eee'
    }
  },

  geo: {
    itemStyle: {
      areaColor: '#dddddd',
      borderColor: '#eeeeee',
      borderWidth: 0.5
    },
    label: {
      color: '#d87a80'
    },
    emphasis: {
      label: {
        color: 'rgb(100,0,0)'
      },
      itemStlye: {
        areaColor: 'rgba(254,153,78,1)',
        borderColor: '#444',
        borderWidth: 1
      }
    }
  }
}
