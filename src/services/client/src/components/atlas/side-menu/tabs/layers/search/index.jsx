import React, { useContext, forwardRef, useState, useMemo, useEffect } from 'react'
import { AtlasContext } from '../../../../state'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import {
  Box,
  Card,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { Search as SearchIcon, Close as CloseIcon, Add as AddIcon } from '@material-ui/icons'
import { MessageDialogue, Record } from '../../../../..'
import Minisearch from 'minisearch'
import QuickForm from '@saeon/quick-form'
import { debounce } from '../../../../../../lib/fns'
import { MapContext } from '../../../../../../modules/provider-map'
import useStyles from './style'
import clsx from 'clsx'
import { createLayer, LayerTypes } from '../../../../../../lib/ol'

const LIST_PADDING_SIZE = 0
const ITEM_SIZE = 116
const ITEM_Y_PADDING = 4
const ITEM_X_PADDING = 2

var cachedSearch

export default () => {
  const classes = useStyles()
  const [textSearch, setTextSearch] = useState(cachedSearch || '')
  const { layers } = useContext(AtlasContext)
  const { proxy } = useContext(MapContext)
  // const { width, height } = useContext(SideMenuContext) // TODO - use the dynamic height thing

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
      <Box m={1}>
        <Typography variant="overline">{`Active datasets (${searchResults?.length})`}</Typography>
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
                    <SearchIcon fontSize="small" />
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
          height: 'calc(100% - 71px - 26px - 32px)',
        }}
        m={1}
      >
        {searchResults.length ? (
          <AutoSizer>
            {({ width, height }) => (
              <List
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
                  const { DOI, description, id: record_id, layerId, LAYERS, uri } = layers.find(
                    ({ id: _id }) => _id === id
                  )

                  return (
                    <div
                      style={{
                        ...style,
                        top: `${parseFloat(style.top) + LIST_PADDING_SIZE}px`,
                        padding: `${
                          index && ITEM_Y_PADDING
                        }px ${ITEM_X_PADDING}px ${ITEM_Y_PADDING}px ${ITEM_X_PADDING}px`,
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
                            {DOI.truncate(30)}
                          </Typography>
                          <MessageDialogue
                            onClick
                            title={onClose => (
                              <div style={{ display: 'flex' }}>
                                <Typography style={{ marginRight: 'auto', alignSelf: 'center' }}>
                                  METADATA RECORD
                                </Typography>
                                <IconButton
                                  onClick={e => {
                                    e.stopPropagation()
                                    onClose()
                                  }}
                                  style={{ marginLeft: 'auto', alignSelf: 'center' }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </div>
                            )}
                            tooltipProps={{
                              placement: 'right',
                              title: `${description}`,
                            }}
                            iconProps={{ size: 'small', fontSize: 'small' }}
                            dialogueContentProps={{ style: { padding: 0 } }}
                            dialogueProps={{ fullWidth: true }}
                            paperProps={{ style: { maxWidth: 'none', minHeight: '84px' } }}
                          >
                            <Record id={record_id} />
                          </MessageDialogue>
                        </Box>

                        {/* Title */}
                        <Box m={1}>
                          <Typography variant="caption">{description.truncate(95)}</Typography>
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
      <Box m={1}>
        <Tooltip placement="right" title="Add layer via server address">
          <IconButton
            onClick={() =>
              alert('Users will be able to add additional datasets from the catalogue to the atlas')
            }
            style={{ float: 'right' }}
            size="small"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <div style={{ clear: 'both' }} />
      </Box>
    </>
  )
}
