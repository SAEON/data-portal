import { useState, useEffect, useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { Pencil as PencilIcon, Close as CloseIcon } from '../../../../../../components/icons'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Draw, { createBox } from 'ol/interaction/Draw'
import WKT from 'ol/format/WKT'
import { nanoid } from 'nanoid'
import { context as searchContext } from '../../../../../../contexts/search'
import { alpha } from '@mui/material/styles'
import { Span } from '../../../../../../components/html-tags'
import Feature from 'ol/Feature'

const wkt = new WKT()

var draw
var defaultZoom
var defaultCenter

export default ({ map }) => {
  const [selectActive, setSelectActive] = useState(false)
  const { global, setGlobal } = useContext(searchContext)
  const [extent, setExtent] = useState(global.extent)

  defaultZoom = defaultZoom || map.getView().getZoom()
  defaultCenter = defaultCenter || map.getView().getCenter()

  const source = new VectorSource({ wrapX: false })

  const layer = new VectorLayer({
    id: `${nanoid()}-drawLayer`,
    title: 'Draw layer',
    source,
  })

  /**
   * Manage the extent state locally for a snappier UI
   * And update the URI state when necessary
   */
  useEffect(() => {
    setGlobal({
      extent: extent || undefined,
    })
  }, [extent])

  /**
   * On first render, if there is an extent
   * Add a feature to the map source
   *
   * Every time the map is zoomed, the
   * loadstart event is fired. So it's
   * necessary to check if there are any
   * features before adding any
   */
  useEffect(() => {
    if (extent) {
      map.on('loadstart', () => {
        if (!source.getFeatures().length) {
          // Add feature to source
          source.addFeature(
            new Feature({
              id: 'extent-filter',
              geometry: wkt.readGeometry(extent),
            })
          )

          // Zoom into polygon
          const view = map.getView()
          const _extent = wkt.readGeometry(extent)
          view.fit(_extent, { padding: [100, 100, 100, 100] })
        }
      })
    }
  }, [])

  /**
   * On first render configure
   * the page to allow user to
   * escape draw mode by pressing
   * the escape key
   */
  useEffect(() => {
    const keydown = e => {
      if (e.key === 'Escape') {
        map.removeInteraction(draw)
        setSelectActive(false)
        setExtent(undefined)
        const view = map.getView()
        view.setZoom(defaultZoom)
        view.setCenter(defaultCenter)
      }
    }

    const body = document.getElementsByTagName('body')[0]
    body.addEventListener('keydown', keydown)
    map.addLayer(layer)

    return () => {
      map.removeInteraction(draw)
      map.removeLayer(layer)
      body.removeEventListener('keydown', keydown)
    }
  }, [])

  return (
    <Paper
      variant="outlined"
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        mt: theme => theme.spacing(1),
        mr: theme => theme.spacing(1),
        padding: theme => theme.spacing(0.25),
        backgroundColor: theme => alpha(theme.palette.common.white, 0.9),
        transition: theme => theme.transitions.create(['background-color']),
        '&:hover': {
          backgroundColor: theme => theme.palette.common.white,
        },
      }}
    >
      <Tooltip title={'Filter by bounding box'} placement="top-start">
        <Span>
          <IconButton
            aria-label="Toggle extent filter draw tool"
            size="small"
            onClick={() => {
              const isActive = !selectActive
              if (isActive) {
                draw = new Draw({
                  freehand: true,
                  source,
                  type: 'Circle',
                  geometryFunction: createBox(),
                })

                map.addInteraction(draw)

                // Always create a fresh polygon
                draw.on('drawstart', () => {
                  source.clear()
                })

                // On drawend, apply the filter
                draw.on('drawend', e => {
                  const feat = e.feature
                  const geometry = feat.getGeometry()
                  setExtent(wkt.writeGeometry(geometry))
                })
              } else {
                map.removeInteraction(draw)
              }
              setSelectActive(isActive)
            }}
          >
            <PencilIcon
              sx={{
                color: theme =>
                  selectActive ? theme.palette.success.main : theme.palette.text.secondary,
              }}
              fontSize="small"
            />
          </IconButton>
        </Span>
      </Tooltip>
      {extent && (
        <Tooltip title={'Clear the extent filter'} placement="top-start">
          <Span>
            <IconButton
              aria-label="Remove extent filter"
              size="small"
              onClick={() => {
                setExtent(undefined)
                setSelectActive(false)
                map.removeInteraction(draw)
                source.clear()
                const view = map.getView()
                view.setZoom(defaultZoom)
                view.setCenter(defaultCenter)
              }}
            >
              <CloseIcon fontSize="small" sx={{ color: theme => theme.palette.error.dark }} />
            </IconButton>
          </Span>
        </Tooltip>
      )}
    </Paper>
  )
}
