import React, { memo } from 'react'
import SaeonSearch from './modules/saeon-search'
import CsirLayers from './modules/csir'
import HstLayers from './modules/health-systems-trust'
import { Search as SearchIcon } from '@material-ui/icons'
import { DragMenu, CsirIcon, NrfIcon, HstIcon } from '../../components'
import DialMenu from './_dial-menu'
import { MenuContext } from '../provider-menu'
import { SpeedDialAction } from '@material-ui/lab'
import useStyles from './style'

export default () => {
  const classes = useStyles()
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, getMenuById, setActiveMenu, getActiveMenuZIndex }) => {
        return (
          <DialMenu
            style={{ position: 'absolute', right: 20, top: 57 }}
            direction={'left'}
            icon={<SearchIcon />}
          >
            {/* HST (Health Systems Trust) search */}
            <SpeedDialAction
              className={classes.dialAction}
              icon={<HstIcon fontSize="large" />}
              tooltipTitle="Search HST (Health Systems Trust) data"
              onClick={() => {
                const id = 'hstSearchMenu'
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
                            onMouseDown={() => setActiveMenu(id)}
                            zIndex={getMenuById(id).zIndex}
                            title={'Search HST data'}
                            active={Boolean(getMenuById(id))}
                            close={() => removeMenu(id)}
                          >
                            {({ height, width }) => <HstLayers height={height} width={width} />}
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
              className={classes.dialAction}
              icon={<NrfIcon fontSize="large" />}
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
                            defaultHeight={600}
                            onMouseDown={() => setActiveMenu(id)}
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
              className={classes.dialAction}
              icon={<CsirIcon fontSize="large" />}
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
                            onMouseDown={() => setActiveMenu(id)}
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
