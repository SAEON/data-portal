import { cloneElement } from 'react'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink } from '../../hooks/use-share-link'
import getUriState from '../../lib/fns/get-uri-state'
import Loading from '../../components/loading'
import DashboardContextProvider from './context'
import { gql, useQuery } from '@apollo/client'
import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Layout from './layout'
import FiltersDrawer from './drawer/index'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import useTheme from '@material-ui/core/styles/useTheme'

const POLLING_INTERVAL = 500

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

export default ({ id }) => {
  const theme = useTheme()
  const { poll } = getUriState()
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/dashboard?id=${id}`,
    params: false,
  })

  const { error, loading, data, startPolling } = useQuery(
    gql`
      query($id: ID!) {
        dashboard(id: $id) {
          id
          title
          subtitle
          description
          layout
          filters {
            id
          }
        }
      }
    `,
    {
      variables: { id },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  if (poll) {
    startPolling(POLLING_INTERVAL)
  }

  const { layout, filters, title, subtitle, description } = data.dashboard
  const filterIds = filters.map(({ id }) => id)

  return (
    <DashboardContextProvider filterIds={filterIds || []}>
      {/* HEADER */}
      <ElevationScroll>
        <AppBar>
          <Toolbar variant="dense" style={{ display: 'flex' }}>
            <Typography style={{ margin: 'auto' }} variant="overline">
              {title || 'Untitled'}
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        {/* OVERVIEW */}
        <Box my={2}>
          <Card
            variant="outlined"
            style={{ backgroundColor: theme.backgroundColor, margin: theme.spacing(1) }}
          >
            <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography style={{ margin: 'auto', textAlign: 'center' }} variant="overline">
                {subtitle || 'No subtitle'}
              </Typography>
              <Typography
                style={{ margin: 'auto', textAlign: 'justify', marginTop: theme.spacing(2) }}
                variant="body2"
              >
                {description || 'No description'}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
      {/* TOOLBAR */}
      <Container>
        <Box my={1}>
          <Card
            variant="outlined"
            style={{
              backgroundColor: theme.backgroundColor,
              margin: theme.spacing(1),
              padding: theme.spacing(1),
            }}
          >
            <FiltersDrawer filterIds={filterIds} />
          </Card>
        </Box>
      </Container>
      {/* GRID */}
      <Container>
        <Box my={1}>
          <Layout items={layout} />
        </Box>
      </Container>
    </DashboardContextProvider>
  )
}
