import { useContext, forwardRef } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useLocation } from 'react-router-dom'
import packageJson from '../../../package.json'
import { CATALOGUE_DEPLOYMENT_ENV } from '../../config'
import Authentication from './auth'
import ShareOrEmbed from '../../components/share-or-embed'
import { context as globalContext } from '../../contexts/global'
import NavMenu from './nav'
import useTheme from '@material-ui/core/styles/useTheme'

const TITLE = `SAEON DATA PORTAL ${
  CATALOGUE_DEPLOYMENT_ENV === 'production'
    ? ''
    : `${CATALOGUE_DEPLOYMENT_ENV}.${packageJson.version}`
}`

export default forwardRef((props, ref) => {
  useLocation() // Trigger re-render on location changes
  const { global } = useContext(globalContext)
  const { selectedIds } = global
  const theme = useTheme()

  return (
    <div ref={ref}>
      <AppBar color="primary" variant="outlined" position="fixed">
        <Toolbar disableGutters={true} variant="dense">
          <NavMenu />
          <header>
            <Typography
              component={Link}
              style={{ color: 'white', cursor: 'pointer', margin: '0 8px' }}
              href="/"
              display="block"
              variant="body2"
            >
              {TITLE}
            </Typography>
          </header>

          {window.location.pathname.includes('atlas') && (
            <ShareOrEmbed
              search={
                selectedIds.length && window.location.pathname.includes('atlas')
                  ? { ids: selectedIds }
                  : global
              }
            />
          )}

          {!window.location.pathname.includes('login') && (
            <div style={{ marginRight: theme.spacing(1), marginLeft: 'auto' }}>
              <Authentication />
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* PUSH PAGE DOWN */}
      <Toolbar disableGutters={true} variant="dense" />
    </div>
  )
})
