import { useContext } from 'react'
import { createPortal } from 'react-dom'
import Provider, { context as downloadsContext } from './context'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import BarChart from './charts/bar-chart'
import { styled, alpha } from '@mui/material/styles'
import Download from './download'

const Item = styled(({ children, gridProps }) => (
  <Grid item xs={12} lg={4} {...gridProps}>
    <Paper
      variant="elevation"
      sx={{ height: 420, background: theme => alpha(theme.palette.common.white, 0.95) }}
    >
      {children}
    </Paper>
  </Grid>
))({})

const Layout = ({ headerRef }) => {
  const { downloadsCount, referrerCount, deviceCount, downloadsByDate, ipLocationCount } =
    useContext(downloadsContext)

  return (
    <>
      {createPortal(<Download />, headerRef.current)}
      <Grid container spacing={2}>
        {/* TITLE */}
        <Grid item xs={12}>
          <Paper
            variant="elevation"
            sx={{
              padding: theme => theme.spacing(1),
              background: theme => alpha(theme.palette.common.white, 0.95),
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', display: 'block', textAlign: 'center' }}
              variant="overline"
            >
              Total downloads {downloadsCount?.count}
            </Typography>
          </Paper>
        </Grid>

        <Item gridProps={{ lg: 5 }}>
          <BarChart title={'By date'} type="bar" categoryFieldName="date" data={downloadsByDate} />
        </Item>

        <Item gridProps={{ lg: 7 }}>
          <BarChart
            title={'By referrer'}
            yScale="log"
            categoryFieldName="referrer"
            data={referrerCount}
          />
        </Item>

        <Item gridProps={{ lg: 8 }}>
          <BarChart
            title={'By location'}
            yScale="log"
            categoryFieldName="clientIpLocation"
            data={ipLocationCount}
          />
        </Item>

        <Item>
          <BarChart
            title={'By device'}
            yScale="log"
            categoryFieldName="device"
            data={deviceCount}
          />
        </Item>
      </Grid>
    </>
  )
}

export default ({ headerRef }) => (
  <Provider>
    <Layout headerRef={headerRef} />
  </Provider>
)
