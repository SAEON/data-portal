import { Link } from 'react-router-dom'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Toolbar_ from './toolbar'
import Hidden from '@material-ui/core/Hidden'
import { TITLE } from '../../../config'

export const IMAGE_HEIGHT = 48

export const Toolbar = Toolbar_

export default () => {
  return (
    <Toolbar_>
      {/* SAEON LOGO */}
      <Hidden mdDown>
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
      </Hidden>

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
      <Hidden mdDown>
        <a
          style={{ display: 'flex', flexBasis: 0, flexGrow: 1 }}
          target="_blank"
          rel="noreferrer"
          href="http://sarva.saeon.ac.za/"
        >
          <img
            style={{
              maxHeight: IMAGE_HEIGHT,
              width: 'auto',
              display: 'block',
              marginLeft: 'auto',
            }}
            src="/sarva-logo-cropped.png"
            alt="SARVA logo"
          />
        </a>
      </Hidden>
    </Toolbar_>
  )
}
