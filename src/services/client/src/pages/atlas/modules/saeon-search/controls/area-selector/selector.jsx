import React, { useEffect } from 'react'
import { Button, Grid } from '@material-ui/core'
import { Gesture as GestureIcon, CropSquare as SquareIcon } from '@material-ui/icons'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Draw, { createBox } from 'ol/interaction/Draw'
import { nanoid } from 'nanoid'

var draw
export default ({ updateForm, selectPolygonActive, selectRectActive, proxy, onDrawEnd }) => {
  useEffect(() => {
    const keyDown = e => {
      if (e.key === 'Escape') {
        proxy.removeInteraction(draw)
        updateForm({
          selectRectActive: false,
          selectPolygonActive: false,
        })
      }
    }

    const body = document.getElementsByTagName('body')[0]
    body.addEventListener('keydown', keyDown)
    return () => {
      proxy.removeInteraction(draw)
      body.removeEventListener('keydown', keyDown)
    }
  }, [])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          color={selectRectActive ? 'secondary' : 'default'}
          onClick={() => {
            proxy.removeInteraction(draw)
            if (!selectRectActive) {
              const source = new VectorSource({ wrapX: false })
              const layer = new VectorLayer({
                id: `${nanoid()}-drawLayer`,
                title: 'Draw layer',
                source,
              })
              draw = new Draw({
                source: source,
                type: 'Circle',
                geometryFunction: createBox(),
              })
              proxy.addInteraction(draw)
              draw.on('drawend', event => {
                const feat = event.feature
                const geometry = feat.getGeometry()
                onDrawEnd(geometry)
              })
              proxy.addLayer(layer)
            }
            updateForm({
              selectRectActive: !selectRectActive,
              selectPolygonActive: false,
            })
          }}
          startIcon={<SquareIcon fontSize="default" />}
        >
          Select square extent
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          color={selectPolygonActive ? 'secondary' : 'default'}
          onClick={() => {
            proxy.removeInteraction(draw)
            if (!selectPolygonActive) {
              const source = new VectorSource({ wrapX: false })
              const layer = new VectorLayer({
                id: `${nanoid()}-drawLayer`,
                title: 'Draw layer',
                source,
              })
              draw = new Draw({
                source: source,
                type: 'Polygon',
                freehand: true,
              })
              proxy.addInteraction(draw)
              draw.on('drawend', event => {
                const feat = event.feature
                const geometry = feat.getGeometry()
                onDrawEnd(geometry)
              })
              proxy.addLayer(layer)
            }
            updateForm({
              selectPolygonActive: !selectPolygonActive,
              selectRectActive: false,
            })
          }}
          startIcon={<GestureIcon fontSize="default" />}
        >
          Select freeform extent
        </Button>
      </Grid>
    </Grid>
  )
}
