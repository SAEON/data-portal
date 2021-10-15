import { useContext, forwardRef, useState, useMemo, useEffect } from 'react'
import { AtlasContext } from '../../../../state'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import CloseIcon from 'mdi-react/CloseIcon'
import SearchIcon from 'mdi-react/SearchIcon'
import MessageDialogue from '../../../../../../components/message-dialogue'
import Record from '../../../../../record'
import Minisearch from 'minisearch'
import QuickForm from '@saeon/quick-form'
import debounce from '../../../../../../lib/fns/debounce'
import { MapContext } from '../../../../../../contexts/ol-react'
import useStyles from './style'
import clsx from 'clsx'
import { createLayer, LayerTypes } from '../../../../../../lib/ol'
import SaeonGeoServerLegend from '../../active-layers/layers/layer-types/saeon-geoserver/legend'

const LIST_PADDING_SIZE = 0
const ITEM_SIZE = 116
const ITEM_Y_PADDING = 4
const ITEM_X_PADDING_LEFT = 2
const ITEM_X_PADDING_RIGHT = 8

const SEARCH_BOX_HEIGHT = 71
const SEARCH_BOX_MARGIN = 52

var cachedSearch

export default () => {
  const theme = useTheme()
  const classes = useStyles()
  const [textSearch, setTextSearch] = useState(cachedSearch || '')
  const { layers } = useContext(AtlasContext)
  const { proxy } = useContext(MapContext)

  useEffect(() => {
    return () => (cachedSearch = textSearch)
  })

  const minisearch = useMemo(() => {
    const minisearch = new Minisearch({
      fields: ['uri', 'description', 'doi'],
      storeFields: ['id'],
      extractField: (document, fieldName) =>
        fieldName.split('.').reduce((doc, key) => doc && doc[key], document),
      searchOptions: {
        fuzzy: 0.5,
      },
    })

    minisearch.addAll(layers)
    return minisearch
  }, [layers])

  const searchResults = textSearch
    ? minisearch.search(textSearch).map(({ id, score }) => [id, score])
    : layers.map(({ id }) => [id, undefined])

  return (
    <>
      <Box p={1}>
        <Typography variant="overline">{`Available datasets (${searchResults?.length})`}</Typography>
        <QuickForm
          value={textSearch}
          effects={[debounce(({ value }) => setTextSearch(value), 250)]}
        >
          {(update, { value }) => (
            <TextField
              autoComplete="off"
              fullWidth
              id="filter-available-layers"
              size="small"
              value={value}
              onChange={e => update({ value: e.target.value })}
              placeholder="Sort layers..."
              variant="outlined"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={18} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </QuickForm>
      </Box>

      <Box
        className={clsx(classes.sortList)}
        style={{
          height: `calc(100% - ${SEARCH_BOX_HEIGHT}px - ${SEARCH_BOX_MARGIN}px)`,
        }}
        m={1}
      >
        {searchResults.length ? (
          <AutoSizer>
            {({ width, height }) => (
              <List
                style={{ overflowY: 'scroll' }}
                width={width}
                height={height}
                innerElementType={forwardRef(({ style, ...otherProps }, ref) => (
                  <div
                    ref={ref}
                    style={{
                      ...style,
                      height: `${parseFloat(style.height) + LIST_PADDING_SIZE * 2}px`,
                    }}
                    {...otherProps}
                  />
                ))}
                itemCount={searchResults?.length}
                itemSize={ITEM_SIZE + 2 * ITEM_Y_PADDING}
              >
                {({ index, style }) => {
                  const [id, score] = searchResults[index]
                  const {
                    DOI = 'UNKNOWN DOI',
                    title,
                    description,
                    id: record_id,
                    layerId,
                    LAYERS,
                    uri,
                  } = layers.find(({ id: _id }) => _id === id)

                  return (
                    <div
                      style={{
                        ...style,
                        top: `${parseFloat(style.top) + LIST_PADDING_SIZE}px`,
                        padding: `${
                          index && ITEM_Y_PADDING
                        }px ${ITEM_X_PADDING_RIGHT}px ${ITEM_Y_PADDING}px ${ITEM_X_PADDING_LEFT}px`,
                      }}
                    >
                      <Card
                        className={clsx({
                          [classes['record-card']]: true,
                          [classes.isSelected]: Boolean(proxy.getLayerById(layerId)),
                        })}
                        variant="elevation"
                        onClick={() =>
                          proxy.getLayerById(layerId)
                            ? proxy.removeLayerById(layerId)
                            : proxy.addLayer(
                                createLayer({
                                  LegendMenu: () => (
                                    <SaeonGeoServerLegend
                                      uri={`${uri}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&TRANSPARENT=true&LAYER=${LAYERS}&LEGEND_OPTIONS=forceLabels:on`}
                                      title={title}
                                    />
                                  ),
                                  layerType: LayerTypes.TileWMS,
                                  id: layerId,
                                  title: description,
                                  uri,
                                  LAYERS,
                                })
                              )
                        }
                      >
                        {/* Metadata item controls */}
                        <Box m={1} style={{ display: 'flex' }}>
                          <Typography
                            style={{ marginRight: 'auto', alignSelf: 'center' }}
                            variant="overline"
                          >
                            {DOI?.truncate(30)}
                          </Typography>
                          {/* TODO this code is defined in 3 places */}
                          <MessageDialogue
                            title={onClose => (
                              <div style={{ display: 'flex' }}>
                                <Typography style={{ marginRight: 'auto', alignSelf: 'center' }}>
                                  METADATA RECORD
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={e => {
                                    e.stopPropagation()
                                    onClose()
                                  }}
                                  style={{ marginLeft: 'auto', alignSelf: 'center' }}
                                >
                                  <CloseIcon size={18} />
                                </IconButton>
                              </div>
                            )}
                            titleProps={{
                              style: {
                                paddingRight: theme.spacing(2),
                                paddingLeft: theme.spacing(2),
                              },
                            }}
                            tooltipProps={{
                              placement: 'right',
                              title: `${description}`,
                            }}
                            iconProps={{ size: 'small', fontSize: 'small' }}
                            dialogueContentProps={{ style: { padding: 0 } }}
                            dialogueProps={{ fullWidth: true }}
                            paperProps={{ style: { maxWidth: 'none', minHeight: '66px' } }}
                          >
                            <Record id={record_id} />
                          </MessageDialogue>
                        </Box>

                        {/* Title */}
                        <Box m={1}>
                          <Typography variant="caption">{description?.truncate(95)}</Typography>
                          <Typography
                            style={{ position: 'absolute', right: 12, bottom: 0 }}
                            variant="overline"
                          >
                            Sort score: {score?.toFixed(2) || 'NA'}
                          </Typography>
                        </Box>
                      </Card>
                    </div>
                  )
                }}
              </List>
            )}
          </AutoSizer>
        ) : (
          <Typography variant="body2">No results</Typography>
        )}
      </Box>
    </>
  )
}
