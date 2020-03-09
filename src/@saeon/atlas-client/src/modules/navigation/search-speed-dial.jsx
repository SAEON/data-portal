import React, { PureComponent } from 'react'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import DraggableSearchMenu from '../draggable-search-menu'
import { DragMenu } from '../../components'
import {
  Extension as ExtensionIcon,
  Layers as LayersIcon,
  Search as SearchIcon
} from '@material-ui/icons'

export default class extends PureComponent {
  state = {
    open: false,
    searchLayersActive: false,
    searchEsriActive: false
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { searchEsriActive, searchLayersActive, open } = this.state
    const { proxy } = this.props

    return (
      <>
        <SpeedDial
          style={{ position: 'absolute', left: 20, top: 57 }}
          ariaLabel="Search speed dial menu"
          icon={<SearchIcon />}
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={open}
          direction={'right'}
        >
          <SpeedDialAction
            icon={<LayersIcon color={searchLayersActive ? 'primary' : 'secondary'} />}
            tooltipTitle={'Search layers'}
            onClick={() => this.setState({ open: false, searchLayersActive: !searchLayersActive })}
          />
          <SpeedDialAction
            icon={<ExtensionIcon color={searchEsriActive ? 'primary' : 'secondary'} />}
            tooltipTitle={'Search ESRI'}
            onClick={() => this.setState({ open: false, searchEsriActive: !searchEsriActive })}
          />
        </SpeedDial>

        <DragMenu
          title="Search ESRI"
          active={searchEsriActive}
          close={() => this.setState({ searchEsriActive: false })}
          proxy={proxy}
        >
          hello world
        </DragMenu>

        <DraggableSearchMenu
          active={searchLayersActive}
          close={() => this.setState({ searchLayersActive: false })}
          proxy={proxy}
        />
      </>
    )
  }
}
