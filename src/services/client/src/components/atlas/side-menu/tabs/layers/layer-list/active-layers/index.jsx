import React, { useContext, forwardRef } from 'react'
import { MapContext } from '../../../../../../../modules/provider-map'
import {
  Box,
  Card,
  CardHeader,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  Collapse,
  CardContent,
  IconButton,
} from '@material-ui/core'
import {
  DragIndicator,
  Close as CloseIcon,
  ZoomIn as ZoomInIcon,
  Info as InfoIcon,
} from '@material-ui/icons'
import QuickForm from '@saeon/quick-form'
import { MessageDialogue, Record, Slider, DataDownloadButton } from '../../../../../..'
import { ToggleVisibility, DeleteLayer, ExpandLayer } from '../../../../../components'
import { AtlasContext } from '../../../../../state'

export default () => {
  const { proxy } = useContext(MapContext)
  const { layers } = useContext(AtlasContext)

  return (
    // data layers
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      {proxy
        .getLayers()
        .getArray()
        .map(layer => {
          const id = layer.get('id')
          const title = layer.get('title')
          const visible = layer.getVisible()

          const { id: record_id, geoExtent, immutableResource } =
            layers.find(({ layerId }) => layerId === id) || {}

          return record_id ? (
            // This is a SAEON dataset
            <div key={id}>
              <QuickForm>
                {(update, { expanded }) => (
                  <Card style={{ marginBottom: 10 }}>
                    <CardHeader
                      title={
                        <Typography style={{ wordBreak: 'break-word' }} variant="caption">
                          {title.truncate(75)}
                        </Typography>
                      }
                      component={forwardRef(({ children }, ref) => (
                        <AppBar ref={ref} color="default" position="relative" variant="outlined">
                          <Toolbar
                            style={{ paddingRight: 0, paddingLeft: 0, display: 'flex' }}
                            variant="dense"
                          >
                            {/* Drag Icon */}
                            <DragIndicator fontSize="small" style={{ marginRight: 10 }} />

                            {/* Title (comes from CardHeader.title prop) */}
                            <Tooltip placement="right-end" title={title}>
                              <div>{children}</div>
                            </Tooltip>

                            {/* Expand layer info */}
                            <ExpandLayer
                              expanded={expanded}
                              toggleExpanded={() => update({ expanded: !expanded })}
                            />
                          </Toolbar>
                        </AppBar>
                      ))}
                    />

                    {/* Content */}
                    <Collapse in={expanded}>
                      {/* LAYER CONTROLS */}
                      <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {/* Layer info */}
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
                            placement: 'top',
                            title: 'Show layer metadata',
                          }}
                          iconProps={{ size: 'small', fontSize: 'small' }}
                          dialogueContentProps={{ style: { padding: 0 } }}
                          dialogueProps={{ fullWidth: true }}
                          paperProps={{ style: { maxWidth: 'none', minHeight: '84px' } }}
                        >
                          <Record id={record_id} />
                        </MessageDialogue>

                        {/* Data Download */}
                        <DataDownloadButton
                          style={{ alignSelf: 'center', marginRight: 16 }}
                          size="small"
                          fontSize="small"
                          tooltipPlacement="top"
                          immutableResource={immutableResource}
                        />

                        {/* Zoom to layer extent */}
                        <Tooltip placement="top" title="Zoom to layer extent">
                          <IconButton
                            style={{ alignSelf: 'center' }}
                            size="small"
                            onClick={() => {
                              proxy.getView().fit(geoExtent, { duration: 1000 })
                            }}
                          >
                            <ZoomInIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {/* Toggle layer visibility */}
                        <ToggleVisibility
                          visible={visible}
                          toggleVisible={() => layer.setVisible(!visible)}
                        />

                        {/* Delete layer */}
                        <DeleteLayer onClick={() => proxy.removeLayer(layer)} />
                      </CardContent>

                      {/* MAP CONTROLS */}
                      <CardContent>
                        <Slider
                          defaultValue={layer.get('opacity') * 100}
                          title={'Opacity'}
                          updateValue={({ value }) => layer.setOpacity(value / 100)}
                        />
                      </CardContent>
                    </Collapse>
                  </Card>
                )}
              </QuickForm>
            </div>
          ) : (
            // This is a base layer (or external dataset to SAEON)
            <div key={id}>
              <QuickForm>
                {(update, { expanded }) => (
                  <Card style={{ marginBottom: 10 }}>
                    <CardHeader
                      title={
                        <Typography style={{ wordBreak: 'break-word' }} variant="caption">
                          {title.truncate(55)}
                        </Typography>
                      }
                      component={forwardRef(({ children }, ref) => (
                        <AppBar ref={ref} color="default" position="relative" variant="outlined">
                          <Toolbar
                            style={{ paddingRight: 0, paddingLeft: 0, display: 'flex' }}
                            variant="dense"
                          >
                            {/* Drag Icon */}
                            <DragIndicator fontSize="small" style={{ marginRight: 10 }} />

                            {/* Title (comes from CardHeader.title prop) */}
                            <Tooltip placement="right-end" title={title}>
                              <div>{children}</div>
                            </Tooltip>

                            {/* Expand layer info */}
                            <ExpandLayer
                              expanded={expanded}
                              toggleExpanded={() => update({ expanded: !expanded })}
                            />
                          </Toolbar>
                        </AppBar>
                      ))}
                    />

                    {/* Content */}
                    <Collapse in={expanded}>
                      <CardContent style={{ display: 'flex' }}>
                        {/* Toggle layer visibility */}
                        <ToggleVisibility
                          style={{ marginLeft: 'auto', alignSelf: 'center' }}
                          visible={visible}
                          toggleVisible={() => layer.setVisible(!visible)}
                        />

                        {/* Show layer info */}
                        <IconButton
                          size="small"
                          onClick={() => alert('TODO - Add GeoServer/ESRI/Base layer info')}
                        >
                          <InfoIcon fontSize="small" />
                        </IconButton>

                        {/* Delete layer */}
                        <DeleteLayer onClick={() => proxy.removeLayer(layer)} />
                      </CardContent>
                      <CardContent>
                        <Slider
                          defaultValue={layer.get('opacity') * 100}
                          title={'Opacity'}
                          updateValue={({ value }) => layer.setOpacity(value / 100)}
                        />
                      </CardContent>
                    </Collapse>
                  </Card>
                )}
              </QuickForm>
            </div>
          )
        })
        .filter(_ => _)}
    </Box>
  )
}
