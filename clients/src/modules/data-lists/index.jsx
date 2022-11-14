import { useContext } from 'react'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import ListsProvider from './context'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import AccessDenied from '../../components/access-denied'
import Header from './header'
import Loading from '../../components/loading'
import Layout from './layout'

export default () => {
  const theme = useTheme()
  const isAuthenticated = useContext(authenticationContext).authenticate()
  const { hasPermission } = useContext(authorizationContext)

  if (!isAuthenticated) {
    return <Loading withHeight />
  }

  if (!hasPermission('/data-lists')) {
    return (
      <div style={{ marginTop: theme.spacing(2), height: 1000 }}>
        <AccessDenied requiredPermission="/data-lists" />
      </div>
    )
  }

  return (
    <ListsProvider>
      <Header />

      <div style={{ marginTop: theme.spacing(2) }} />

      <Container style={{ minHeight: 1000 }}>
        <Layout />
      </Container>

      <div style={{ marginTop: theme.spacing(2) }} />
    </ListsProvider>
  )
}