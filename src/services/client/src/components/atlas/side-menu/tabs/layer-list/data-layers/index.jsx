import React, { useContext, forwardRef } from 'react'
import { MapContext } from '../../../../../../modules/provider-map'
import { debounce } from '../../../../../../lib/fns'
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
  ExpandLess,
  ExpandMore,
  Delete as DeleteIcon,
  Visibility,
  VisibilityOff,
  Close as CloseIcon,
} from '@material-ui/icons'
import QuickForm from '@saeon/quick-form'
import { MessageDialogue, Record, Slider } from '../../../../../'
import { AtlasContext } from '../../../../state'

export default () => {
  const { proxy } = useContext(MapContext)
  const { layers } = useContext(AtlasContext)

  return (
    <Box m={1}>
      {proxy
        .getLayers()
        .getArray()
        .map(layer => {
          const id = layer.get('id')
          const title = layer.get('title')
          const visible = layer.get('visible')

          if (id === 'terrestrisBaseMap') return undefined

          const { ploneId } = layers.find(({ layerId }) => layerId === id)

          return (
            <div key={id}>
              <QuickForm>
                {({ updateForm, expanded }) => (
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
                            <IconButton
                              style={{ marginLeft: 'auto' }}
                              onClick={() => updateForm({ expanded: !expanded })}
                            >
                              {expanded ? (
                                <ExpandLess fontSize="small" />
                              ) : (
                                <ExpandMore fontSize="small" />
                              )}
                            </IconButton>
                          </Toolbar>
                        </AppBar>
                      ))}
                    />

                    {/* Content */}
                    <Collapse in={expanded}>
                      <CardContent style={{ display: 'flex' }}>
                        {/* Toggle layer visibility */}
                        <IconButton
                          style={{ marginLeft: 'auto', alignSelf: 'center' }}
                          size="small"
                          onClick={() => layer.setVisible(!visible)}
                        >
                          {visible ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>

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
                          tooltipTitle={'Show full layer info'}
                          iconProps={{ size: 'small', fontSize: 'small' }}
                          dialogueContentProps={{ style: { padding: 0 } }}
                          dialogueProps={{ fullWidth: true }}
                          paperProps={{ style: { maxWidth: 'none', minHeight: '84px' } }}
                        >
                          <Record id={ploneId} />
                        </MessageDialogue>

                        {/* Delete layer */}
                        <IconButton size="small" onClick={() => proxy.removeLayer(layer)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
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
