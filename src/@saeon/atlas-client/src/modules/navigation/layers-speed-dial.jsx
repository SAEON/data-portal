import React, { Component } from 'react'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import {
  Map as MapIcon,
  Print as PrintIcon,
  Toc as TocIcon,
  Layers as LayersIcon
} from '@material-ui/icons'

import { DragMenu } from '../../components'

import DraggableLayersMenu from '../draggable-layers-menu'

export default class extends Component {
  state = {
    open: false,
    layersActive: false,
    legendActive: false,
    printActive: false
  }

  shouldComponentUpdate() {
    return true
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { open, layersActive, legendActive, printActive } = this.state
    const { proxy } = this.props

    return (
      <>
        <SpeedDial
          style={{ position: 'absolute', left: 20, top: 127 }}
          ariaLabel="Layers speed dial menu"
          icon={<MapIcon />}
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={open}
          direction={'right'}
        >
          <SpeedDialAction
            icon={<LayersIcon color={layersActive ? 'primary' : 'secondary'} />}
            tooltipTitle={'Layers'}
            onClick={() => this.setState({ open: false, layersActive: !layersActive })}
          />
          <SpeedDialAction
            icon={<TocIcon color={legendActive ? 'primary' : 'secondary'} />}
            tooltipTitle={'Map legend'}
            onClick={() => this.setState({ open: false, legendActive: !legendActive })}
          />
          <SpeedDialAction
            icon={<PrintIcon color={printActive ? 'primary' : 'secondary'} />}
            tooltipTitle={'Print'}
            onClick={() => this.setState({ open: false, printActive: !printActive })}
          />
        </SpeedDial>

        <DragMenu
          title="Print menu"
          active={printActive}
          close={() => this.setState({ printActive: false })}
          proxy={proxy}
        >
          Content
        </DragMenu>

        <DragMenu
          title="Legend"
          active={legendActive}
          close={() => this.setState({ legendActive: false })}
          proxy={proxy}
        >
          Content
        </DragMenu>

        <DraggableLayersMenu
          active={layersActive}
          close={() => this.setState({ layersActive: false })}
          proxy={proxy}
        />
      </>
    )
  }
}
