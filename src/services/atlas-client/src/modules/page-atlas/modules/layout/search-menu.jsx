import React from 'react'
import SaeonSearch from '../saeon-search'
import CsirLayers from '../csir'
import HstLayers from '../health-systems-trust'
import { Search as SearchIcon } from '@material-ui/icons'
import { CsirIcon, NrfIcon, HstIcon, Form } from '../../../../components'
import DialMenu from './dial-menu'
import { useMenu } from '@saeon/snap-menus'
import { SpeedDialAction } from '@material-ui/lab'
import useStyles from '../../style'
import { isMobile } from 'react-device-detect'

export default () => {
  const classes = useStyles()
  const HstMenu = useMenu({ id: 'hst-menu' })
  const CsirMenu = useMenu({ id: 'csir-menu' })
  const SaeonMenu = useMenu({ id: 'saeon-menu' })

  return (
    <Form hstOpen={false} csirOpen={false} saeonOpen={false}>
      {({ updateForm, hstOpen, csirOpen, saeonOpen }) => {
        const toggleHstMenu = () => updateForm({ hstOpen: !hstOpen })
        const toggleCsirMenu = () => updateForm({ csirOpen: !csirOpen })
        const toggleSaeonMenu = () => updateForm({ saeonOpen: !saeonOpen })

        return (
          <>
            {/* Menu */}
            <HstMenu
              open={hstOpen}
              onClose={toggleHstMenu}
              title={'Search HST data'}
              defaultSnap={isMobile ? 'Top' : null}
            >
              {({ height, width }) => <HstLayers height={height} width={width} />}
            </HstMenu>

            {/* Menu */}
            <CsirMenu
              open={csirOpen}
              onClose={toggleCsirMenu}
              title={'Search CSIR data'}
              defaultSnap={isMobile ? 'Top' : null}
            >
              {({ height, width }) => <CsirLayers height={height} width={width} />}
            </CsirMenu>

            {/* Menu */}
            <SaeonMenu
              open={saeonOpen}
              onClose={toggleSaeonMenu}
              title={'Search SAEON data'}
              defaultSnap={isMobile ? 'Top' : 'Left'}
            >
              {({ height, width }) => <SaeonSearch height={height} width={width} />}
            </SaeonMenu>

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
                onClick={toggleHstMenu}
              />

              {/* CSIR search */}
              <SpeedDialAction
                className={classes.dialAction}
                icon={<CsirIcon fontSize="large" />}
                tooltipTitle={'Search CSIR data'}
                onClick={toggleCsirMenu}
              />

              {/* SAEON search */}
              <SpeedDialAction
                className={classes.dialAction}
                icon={<NrfIcon fontSize="large" />}
                tooltipTitle="Search SAEON data"
                onClick={toggleSaeonMenu}
              />
            </DialMenu>
          </>
        )
      }}
    </Form>
  )
}
