import { forwardRef, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import DragIndicator from '@mui/icons-material/DragIndicator'
import CloseIcon from '@mui/icons-material/Close'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import KeyIcon from '@mui/icons-material/VpnKey'
import ViewDataIcon from '@mui/icons-material/BarChart'
import QuickForm from '../../../../../../../../packages/quick-form'
import MessageDialogue from '../../../../../../../../components/message-dialogue'
import Slider from '../../../../../../../../components/slider'
import DataDownloadButton from '../../../../../../../../components/data-download'
import Record from '../../../../../../../record'
import { ToggleVisibility, DeleteLayer, ExpandLayer } from '../../../../../../components'

export default ({
  layer,
  record_id,
  geoExtent,
  immutableResource,
  proxy,
  LegendMenu,
  DataMenu
}) => {
  const theme = useTheme()
  const title = layer.get('title')
  const visible = layer.getVisible()
  const [legendOpen, setLegendOpen] = useState(false)
  const [dataTableOpen, setDataTableOpen] = useState(false)

  return (
    <>
      <DataMenu
        defaultPosition={{ x: 800, y: 200 }}
        defaultWidth={300}
        title="Data"
        defaultSnap={undefined}
        onClose={() => setDataTableOpen(false)}
        open={dataTableOpen}
      >
        <Box m={1}>
          <Typography variant="overline">Under construction!</Typography>
        </Box>
      </DataMenu>
      <LegendMenu
        defaultPosition={{ x: 650, y: 25 }}
        defaultWidth={200}
        title={'Legend'}
        defaultSnap={undefined}
        open={legendOpen}
        disableMinify
        onClose={() => setLegendOpen(false)}
      >
        {layer.get('LegendMenu') ||
          (() => (
            <div style={{ marginBottom: 10 }}>
              <Typography>No component specified for {layer.get('title')}</Typography>
            </div>
          ))}
      </LegendMenu>
      <QuickForm expanded={false}>
        {(update, { expanded }) => (
          <Card style={{ marginBottom: 10 }}>
            <CardHeader
              title={
                <Typography style={{ wordBreak: 'break-word' }} variant="caption">
                  {title?.truncate(75)}
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
                {/* TODO repeated code */}
                <MessageDialogue
                  onClick
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
                        <CloseIcon />
                      </IconButton>
                    </div>
                  )}
                  tooltipProps={{
                    placement: 'top',
                    title: 'Show layer metadata'
                  }}
                  titleProps={{
                    style: { paddingRight: theme.spacing(2), paddingLeft: theme.spacing(2) }
                  }}
                  iconProps={{ size: 'small', fontSize: 'small' }}
                  dialogueContentProps={{ style: { padding: 0 } }}
                  dialogueProps={{ fullWidth: true }}
                  paperProps={{ style: { maxWidth: 'none', minHeight: '66px' } }}
                >
                  <Record id={record_id} />
                </MessageDialogue>

                {/* Data Download */}
                <DataDownloadButton
                  buttonProps={{ style: { alignSelf: 'center', marginRight: 16 } }}
                  IconButtonSize="small"
                  tooltipPlacement="top"
                  immutableResource={immutableResource}
                  doi={undefined}
                  id={record_id}
                />

                {/* Show layer legend */}
                <Tooltip placement="top" title="Show layer legend">
                  <IconButton
                    style={{ alignSelf: 'center' }}
                    size="small"
                    onClick={() => setLegendOpen(!legendOpen)}
                  >
                    <KeyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                {/* Show layer data */}
                <Tooltip placement="top" title="Show layer data">
                  <IconButton
                    style={{ alignSelf: 'center' }}
                    size="small"
                    onClick={() => setDataTableOpen(!dataTableOpen)}
                  >
                    <ViewDataIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

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

              {/* Opacity Slider */}
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
    </>
  )
}