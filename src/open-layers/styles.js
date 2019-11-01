import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'

const OPACITY_DEFAULT = 0.4
export const clusterStyle = feature => {
  const size = feature.get('features').length
  return new Style({
    image: new CircleStyle({
      radius:
        size > 300 ? 50 : size > 250 ? 45 : size > 200 ? 40 : size > 100 ? 30 : size > 50 ? 25 : size > 20 ? 20 : 15,
      stroke: new Stroke({
        color: `rgba(255, 255, 255, ${OPACITY_DEFAULT})`
      }),
      fill: new Fill({
        color: `rgba(51, 153, 204,${OPACITY_DEFAULT})`
      })
    }),
    text: new Text({
      text: size.toString(),
      fill: new Fill({
        color: `rgba(255, 255, 255,${OPACITY_DEFAULT})`
      })
    })
  })
}

const OPACITY_2 = 0.8
export const clusterStyle2 = feature => {
  const size = feature.get('features').length
  return new Style({
    image: new CircleStyle({
      radius:
        size > 300 ? 50 : size > 250 ? 45 : size > 200 ? 40 : size > 100 ? 30 : size > 50 ? 25 : size > 20 ? 20 : 15,
      stroke: new Stroke({
        color: `rgba(255, 255, 255, ${OPACITY_2})`
      }),
      fill: new Fill({
        color: `rgba(51, 153, 204,${OPACITY_2})`
      })
    }),
    text: new Text({
      text: size.toString(),
      fill: new Fill({
        color: `rgba(255, 255, 255,${OPACITY_2})`
      })
    })
  })
}
