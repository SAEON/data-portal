import Typography from '@mui/material/Typography'
import Toolbar_ from './toolbar'
import Hidden from '@mui/material/Hidden'
import { A, Img, Header, Div } from '../../html-tags'

export const IMAGE_HEIGHT = 48

export const Toolbar = Toolbar_

export default ({ title }) => {
  return (
    <Toolbar_>
      {/* SAEON LOGO */}
      <Hidden mdDown>
        <Div
          sx={{
            flexBasis: 0,
            flexGrow: 1,
            display: 'flex',
          }}
        >
          <A target="_blank" sx={{ display: 'flex' }} href="http://www.saeon.ac.za/">
            <Img
              sx={{ maxHeight: IMAGE_HEIGHT, width: 'auto' }}
              src="/saeon-logo.png"
              alt="SAEON logo"
            />
          </A>
        </Div>
      </Hidden>

      {/* TITLE */}
      <Header
        sx={{
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
      </Header>

      {/* SARVA LOGO */}
      <Hidden mdDown>
        <Div
          sx={{
            flexBasis: 0,
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <A sx={{ display: 'flex' }} target="_blank" href="http://sarva.saeon.ac.za/">
            <Img
              sx={{
                maxHeight: IMAGE_HEIGHT,
                width: 'auto',
                display: 'block',
                marginLeft: 'auto',
              }}
              src="/sarva-logo-cropped.png"
              alt="SARVA logo"
            />
          </A>
        </Div>
      </Hidden>
    </Toolbar_>
  )
}
