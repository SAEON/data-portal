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

const wkt = new WKT()

var draw
var defaultZoom
var defaultCenter

export default ({ proxy }) => {
  const [selectActive, setSelectActive] = useState(false)
  const { global, setGlobal } = useContext(searchContext)
  const [extent, setExtent] = useState(global.extent)

  defaultZoom = defaultZoom || proxy.getView().getZoom()
  defaultCenter = defaultCenter || proxy.getView().getCenter()
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
  }, [extent]) // TODO - the suggested eslint fix breaks the code

  /**
   * On first render, if there is an extent
   * Add a feature to the map source
   */
  useEffect(() => {
    if (extent) {
      // Add feature to source
      const feature = wkt.readFeature(extent)
      source.addFeature(feature)
      // Zoom into polygon
      const view = proxy.getView()
      view.fit(wkt.readGeometry(extent), { padding: [100, 100, 100, 100] })
    }
  }, []) // TODO - the suggested eslint fix breaks the code

  /**
   * On first render configure
   * the page to allow user to
   * escape draw mode by pressing
   * the escape key
   */
  useEffect(() => {
    const keydown = e => {
      if (e.key === 'Escape') {
        proxy.removeInteraction(draw)
        setSelectActive(false)
        setExtent(undefined)
        const view = proxy.getView()
        view.setZoom(defaultZoom)
        view.setCenter(defaultCenter)
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
  }, []) // TODO - the suggested eslint fix breaks the code

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

                proxy.addInteraction(draw)

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
                proxy.removeInteraction(draw)
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
                proxy.removeInteraction(draw)
                source.clear()
                const view = proxy.getView()
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
