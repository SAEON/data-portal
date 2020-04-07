import React, { memo } from 'react'
import { Avatar } from '@material-ui/core'
import SaeonSearch from '../../modules/saeon-search'
import CsirLayers from '../../modules/csir-layers'
import { Search as SearchIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import DialMenu from './_dial-menu'
import { MenuContext } from '../../modules/menu-provider'
import { SpeedDialAction } from '@material-ui/lab'

export default () => {
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, getMenuById, setActiveMenu, getActiveMenuZIndex }) => {
        return (
          <DialMenu
            style={{ position: 'absolute', right: 20, top: 57 }}
            direction={'left'}
            icon={<SearchIcon />}
          >
            {/* CSIR search */}
            <SpeedDialAction
              icon={<Avatar>S</Avatar>}
              tooltipTitle="Search SAEON data"
              onClick={() => {
                const id = 'saeonSearchMenu'
                if (getMenuById(id)) {
                  removeMenu(id)
                } else {
                  addMenu({
                    id,
                    zIndex: getActiveMenuZIndex(),
                    Component: memo(
                      ({ id }) => {
                        return (
                          <DragMenu
                            defaultWidth={800}
                            onMouseDown={() => setActiveMenu('saeonSearchMenu')}
                            zIndex={getMenuById(id).zIndex}
                            title={'Search SAEON data'}
                            active={Boolean(getMenuById(id))}
                            close={() => removeMenu(id)}
                          >
                            {({ height, width }) => <SaeonSearch height={height} width={width} />}
                          </DragMenu>
                        )
                      },
                      ({ zIndex: z1 }, { zIndex: z2 }) => z1 == z2
                    ),
                  })
                }
              }}
            />

            {/* CSIR search */}
            <SpeedDialAction
              icon={<Avatar>C</Avatar>}
              tooltipTitle={'Search CSIR data'}
              onClick={() => {
                const id = 'csirSearchMenu'
                if (getMenuById(id)) {
                  removeMenu(id)
                } else {
                  addMenu({
                    id,
                    zIndex: getActiveMenuZIndex(),
                    Component: memo(
                      ({ id }) => {
                        return (
                          <DragMenu
                            onMouseDown={() => setActiveMenu('csirSearchMenu')}
                            zIndex={getMenuById(id).zIndex}
                            title={'Search CSIR data'}
                            close={() => removeMenu(id)}
                          >
                            {({ height, width }) => <CsirLayers height={height} width={width} />}
                          </DragMenu>
                        )
                      },
                      ({ zIndex: z1 }, { zIndex: z2 }) => z1 == z2
                    ),
                  })
                }
              }}
            />
          </DialMenu>
        )
      }}
    </MenuContext.Consumer>
  )
}
