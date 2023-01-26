import { Div, A, Img } from '../../../components/html-tags'
import { alpha } from '@mui/material/styles'
import Container from '@mui/material/Container'

export default () => {
  return (
    <Div
      sx={{
        backgroundColor: theme => alpha(theme.palette.common.white, 1),
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: theme => theme.spacing(8),
        }}
      >
        <A sx={{ display: 'flex' }} target="_blank" href="http://sarva.saeon.ac.za/">
          <Img
            sx={{
              maxHeight: theme => theme.spacing(24),
              width: 'auto',
              display: 'block',
              marginLeft: 'auto',
            }}
            src="/dsi.png"
            alt="SARVA logo"
          />
        </A>
      </Container>
    </Div>
  )
}
