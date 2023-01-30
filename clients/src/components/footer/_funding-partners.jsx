import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { A, Img } from '../html-tags'

export default () => {
  return (
    <Grid container spacing={2} sx={{ alignContent: 'flex-start' }}>
      <Grid item xs={12}>
        <Typography variant="h5">Funding partners</Typography>
      </Grid>
      <Grid container item xs={12}>
        <A
          sx={{
            backgroundColor: theme => theme.palette.common.white,
            p: 1,
          }}
          target="_blank"
          href="https://www.dst.gov.za/"
        >
          <Img
            sx={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              marginLeft: 'auto',
            }}
            src="/dsi.png"
            alt="Department of Science and Technology logo"
          />
        </A>
        <A
          sx={{
            mt: 2,
            backgroundColor: theme => theme.palette.common.white,
            p: 1,
          }}
          target="_blank"
          href="https://www.dst.gov.za/"
        >
          <Img
            sx={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              marginLeft: 'auto',
            }}
            src="/saeon-logo.png"
            alt="Department of Science and Technology logo"
          />
        </A>
      </Grid>
    </Grid>
  )
}
