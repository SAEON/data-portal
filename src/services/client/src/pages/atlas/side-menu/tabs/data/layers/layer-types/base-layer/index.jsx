import { forwardRef, memo } from 'react'
import {
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
import { DragIndicator, Info as InfoIcon } from '@material-ui/icons'
import QuickForm from '@saeon/quick-form'
import { Slider } from '../../../../../../../../components'
import { ToggleVisibility, DeleteLayer, ExpandLayer } from '../../../../../../components'

/**
 * TODO
 *
 * Memo function should check specific properties
 * proxy and layer objects
 */
export default memo(({ layer, proxy }) => {
  const title = layer.get('title')
  const visible = layer.getVisible()

  return (
    <div>
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
