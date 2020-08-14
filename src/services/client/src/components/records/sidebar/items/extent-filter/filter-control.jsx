import React, { useState, useEffect, useContext } from 'react'
import { Tooltip, IconButton, Card } from '@material-ui/core'
import { CropSquare as CropIcon, Close as CloseIcon } from '@material-ui/icons'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Draw, { createBox } from 'ol/interaction/Draw'
import { nanoid } from 'nanoid'
import { UriStateContext } from '../../../../../modules/provider-uri-state'

var draw
const source = new VectorSource({ wrapX: false })
const layer = new VectorLayer({
  id: `${nanoid()}-drawLayer`,
  title: 'Draw layer',
  source,
})

export default ({ proxy }) => {
  const [selectActive, setSelectActive] = useState(false)
  const [extent, setExtent] = useState(undefined)
  const { setUriState } = useContext(UriStateContext)

  /**
   * Mange the extent state locally for a snappier UI
   * And update the URI state when necessary
   */
  useEffect(() => {
    setUriState({
      extent: extent || '',
    })
  }, [extent])

  useEffect(() => {
    const keydown = e => {
      if (e.key === 'Escape') {
        proxy.removeInteraction(draw)
        setSelectActive(false)
        setExtent(undefined)
      }
    }

    const body = document.getElementsByTagName('body')[0]
    body.addEventListener('keydown', keydown)
    proxy.addLayer(layer)
    return () => {
      proxy.removeInteraction(draw)
      proxy.removeLayer(layer)
      body.removeEventListener('keydown', keydown)
    }
  }, [])

  return (
    <Card
      variant="outlined"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        margin: '10px 10px 0 0',
        padding: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <Tooltip title={'Filter by bounding box'}>
        <IconButton
          size="small"
          color={selectActive ? 'primary' : 'inherit'}
          onClick={() => {
            const isActive = !selectActive
            if (isActive) {
              draw = new Draw({
                source,
                type: 'Circle',
                geometryFunction: createBox(),
              })

              proxy.addInteraction(draw)

              // Always create a fresh polygon
              draw.on('drawstart', () => {
                source.clear()
              })

              // On drawend, apply the filter
              draw.on('drawend', e => {
                const feat = e.feature
                const geometry = feat.getGeometry()
                setExtent(geometry)
              })
            } else {
              proxy.removeInteraction(draw)
            }
            setSelectActive(isActive)
          }}
        >
          <CropIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={'Clear the extent filter'}>
        <span>
          <IconButton
            disabled={extent ? false : true}
            size="small"
            color="primary"
            onClick={() => {
              setExtent(undefined)
              setSelectActive(false)
              proxy.removeInteraction(draw)
              source.clear()
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Card>
  )
}
