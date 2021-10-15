import Typography from '@mui/material/Typography'
import Toolbar_ from './toolbar'
import Hidden from '@mui/material/Hidden'

export const IMAGE_HEIGHT = 48

export const Toolbar = Toolbar_

const aProps = {
  style: { flexBasis: 0, flexGrow: 1, margin: 8, display: 'flex' },
  target: '_blank',
  rel: 'noreferrer',
}

export default ({ title }) => {
  return (
    <Toolbar_>
      {/* SAEON LOGO */}
      <Hidden lgDown>
        <a {...aProps} href="http://www.saeon.ac.za/">
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
          justifyContent: 'center',
        }}
      >
        <Typography color="textPrimary" variant="h5" variantMapping={{ h5: 'h1' }}>
          {title || 'SAEON Data'}
        </Typography>
      </header>

      {/* SARVA LOGO */}
      <Hidden lgDown>
        <a {...aProps} href="http://sarva.saeon.ac.za/">
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
  );
}
