import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import theme from '../../../../lib/echarts-theme'
import catalogueTheme from '../../../../theme'

require('echarts/map/js/china.js')

/*
select 
wkb_geometry,
ST_AsText(wkb_geometry)
from "odp-925377aa-6914-41e8-8b92-f448ebe11f9c"
limit 5
*/
const MapFunc = () => {
  const getOption = {
    title: {
      text: 'title',
      subtext: 'subtitle',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['iphone3', 'iphone4', 'iphone5'],
    },
    visualMap: {
      min: 0,
      max: 2500,
      left: 'left',
      top: 'bottom',
      text: ['visualMapText1', 'visualMapText2'],
      calculable: true,
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: 'iphone3',
        type: 'map',
        mapType: 'china',
        roam: false,
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: true,
          },
        },
        data: [
          { name: '1', value: 20 },
          { name: '2', value: 20 },
          { name: '3', value: 20 },
          { name: '4', value: 20 },
          { name: '5', value: 20 },
          { name: '6', value: 20 },
          { name: '7', value: 20 },
          { name: '8', value: 20 },
          { name: '9', value: 20 },
          { name: '10', value: 20 },
          { name: '11', value: 20 },
          { name: '12', value: 20 },
          { name: '13', value: 20 },
          { name: '14', value: 20 },
          { name: '15', value: 20 },
          { name: '16', value: 20 },
          { name: '17', value: 20 },
          { name: '18', value: 20 },
          { name: '19', value: 20 },
          { name: '20', value: 20 },
          { name: '21', value: 20 },
          { name: '22', value: 20 },
          { name: '23', value: 20 },
          { name: '24', value: 20 },
          { name: '25', value: 20 },
          { name: '26', value: 20 },
          { name: '27', value: 20 },
          { name: '28', value: 20 },
          { name: '29', value: 20 },
          { name: '30', value: 20 },
          { name: '31', value: 20 },
          { name: '32', value: 20 },
          { name: '33', value: 20 },
          { name: '34', value: 20 },
        ],
      },
      {
        name: 'iphone4',
        type: 'map',
        mapType: 'china',
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: true,
          },
        },
        data: [
          { name: '35', value: 20 },
          { name: '36', value: 20 },
          { name: '37', value: 20 },
          { name: '38', value: 20 },
          { name: '39', value: 20 },
          { name: '40', value: 20 },
          { name: '41', value: 20 },
          { name: '42', value: 20 },
          { name: '43', value: 20 },
          { name: '44', value: 20 },
          { name: '45', value: 20 },
          { name: '46', value: 20 },
          { name: '47', value: 20 },
          { name: '48', value: 20 },
          { name: '49', value: 20 },
          { name: '50', value: 20 },
          { name: '51', value: 20 },
          { name: '52', value: 20 },
          { name: '53', value: 20 },
        ],
      },
      {
        name: 'iphone5',
        type: 'map',
        mapType: 'china',
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: true,
          },
        },
        data: [
          { name: '54', value: 20 },
          { name: '55', value: 20 },
          { name: '56', value: 20 },
          { name: '57', value: 20 },
          { name: '58', value: 20 },
          { name: '59', value: 20 },
          { name: '60', value: 20 },
        ],
      },
    ],
  }
  return (
    <ReactEcharts
      theme={theme}
      option={getOption}
      style={{ height: '100%', width: '100%' }}
      className="react_for_echarts"
    />
  )
}

export default MapFunc
