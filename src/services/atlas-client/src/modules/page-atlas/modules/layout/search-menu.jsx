import React, { memo } from 'react'
import SaeonSearch from '../saeon-search'
import CsirLayers from '../csir'
import HstLayers from '../health-systems-trust'
import { Search as SearchIcon } from '@material-ui/icons'
import { CsirIcon, NrfIcon, HstIcon } from '../../../../components'
import DialMenu from './dial-menu'
import { MenuContext, DragMenu } from '@saeon/snap-menus'
import { SpeedDialAction } from '@material-ui/lab'
import useStyles from '../../style'
import { isMobile } from 'react-device-detect'

export default () => {
  const classes = useStyles()
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, getMenuById }) => {
        return (
          <DialMenu
            style={{ marginTop: 6, marginRight: 12 }}
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
                    Component: memo(
                      props => {
                        return (
                          <DragMenu
                            {...props}
                            title={'Search HST data'}
                            defaultSnap={isMobile ? 'Top' : 'BottomLeft'}
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

            {/* SAEON search */}
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
                    Component: memo(
                      props => {
                        return (
                          <DragMenu
                            {...props}
                            title={'Search SAEON data'}
                            defaultSnap={isMobile ? 'Top' : 'Left'}
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
                    Component: memo(
                      props => {
                        return (
                          <DragMenu
                            {...props}
                            title={'Search CSIR data'}
                            defaultSnap={isMobile ? 'Top' : 'TopLeft'}
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
