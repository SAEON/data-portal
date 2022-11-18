import { useContext } from 'react'
import Container from '@mui/material/Container'
import ListsProvider from './context'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import AccessDenied from '../../components/access-denied'
import Header from './header'
import Loading from '../../components/loading'
import Layout from './layout'
import { Div } from '../../components/html-tags'

export default () => {
  const isAuthenticated = useContext(authenticationContext).authenticate()
  const { hasPermission } = useContext(authorizationContext)

  if (!isAuthenticated) {
    return <Loading withHeight />
  }

  if (!hasPermission('/data-lists')) {
    return (
      <Div style={{ mt: theme => theme.spacing(2), height: 1000 }}>
        <AccessDenied requiredPermission="/data-lists" />
      </Div>
    )
  }

  return (
    <ListsProvider>
      <Header />

      <Div sx={{ mt: theme => theme.spacing(2) }} />

      <Container style={{ minHeight: 1000 }}>
        <Layout />
      </Container>

      <Div sx={{ mt: theme => theme.spacing(2) }} />
    </ListsProvider>
  )
}
