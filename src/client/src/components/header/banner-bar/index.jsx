import { Link } from 'react-router-dom'
import MuiLink from '@material-ui/core/Link'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import Toolbar from './toolbar'
import useTheme from '@material-ui/core/styles/useTheme'
import packageJson from '../../../../package.json'
import { CATALOGUE_DEPLOYMENT_ENV } from '../../../config'

export const IMAGE_HEIGHT = 48

const TITLE = `SAEON DATA PORTAL ${
  CATALOGUE_DEPLOYMENT_ENV === 'production'
    ? ''
    : `${CATALOGUE_DEPLOYMENT_ENV}.${packageJson.version}`
}`

export default () => {
  const theme = useTheme()
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Toolbar>
      {/* SAEON LOGO */}
      {mdAndUp && (
        <a
          style={{ display: 'flex', flexBasis: 0, flexGrow: 1 }}
          target="_blank"
          rel="noreferrer"
          href="http://www.saeon.ac.za/"
        >
          <img
            style={{ maxHeight: IMAGE_HEIGHT, width: 'auto' }}
            src="/saeon-logo.png"
            alt="SAEON logo"
          />
        </a>
      )}

      {/* TITLE */}
      <header
        style={{
          display: 'flex',
          flexBasis: 0,
          flexGrow: 1,
          textAlign: 'center',
          minHeight: IMAGE_HEIGHT,
          alignItems: 'center',
        }}
      >
        <MuiLink style={{ display: 'block', width: '100%' }} component={Link} to="/">
          <Typography color="textPrimary" variant="h5" variantMapping={{ h5: 'h1' }}>
            {TITLE}
          </Typography>
        </MuiLink>
      </header>

      {/* SARVA LOGO */}
      {mdAndUp && (
        <a
          style={{ display: 'flex', flexBasis: 0, flexGrow: 1 }}
          target="_blank"
          rel="noreferrer"
          href="http://sarva.ac.za/"
        >
          <img
            style={{ maxHeight: IMAGE_HEIGHT, width: 'auto', display: 'block', marginLeft: 'auto' }}
            src="/sarva-logo-cropped.png"
            alt="SARVA logo"
          />
        </a>
      )}
    </Toolbar>
  )
}
