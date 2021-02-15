import { useState, useEffect, useContext } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CropIcon from '@material-ui/icons/CropSquare'
import CloseIcon from '@material-ui/icons/Close'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Draw, { createBox } from 'ol/interaction/Draw'
import WKT from 'ol/format/WKT'
import { nanoid } from 'nanoid'
import { context as globalContext } from '../../../../../../../contexts/global'

const wkt = new WKT()

var draw
var defaultZoom
var defaultCenter

export default ({ proxy }) => {
  const source = new VectorSource({ wrapX: false })
  const layer = new VectorLayer({
    id: `${nanoid()}-drawLayer`,
    title: 'Draw layer',
    source,
  })

  defaultZoom = defaultZoom || proxy.getView().getZoom()
  defaultCenter = defaultCenter || proxy.getView().getCenter()
  const [selectActive, setSelectActive] = useState(true)
  const { global, setGlobal } = useContext(globalContext)
  const [extent, setExtent] = useState(global.extent)

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

    /**
     * start with selectActive
     */
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
      setExtent(wkt.writeGeometry(geometry))
    })

    setSelectActive(true)

    return () => {
      proxy.removeInteraction(draw)
      proxy.removeLayer(layer)
      body.removeEventListener('keydown', keydown)
    }
  }, []) // TODO - the suggested eslint fix breaks the code

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
                setExtent(wkt.writeGeometry(geometry))
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
            disabled={extent || selectActive ? false : true}
            size="small"
            color="primary"
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
            <CloseIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Card>
  )
}
