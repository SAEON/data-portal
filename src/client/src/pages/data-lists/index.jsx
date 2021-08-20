import { useContext } from 'react'
import Container from '@material-ui/core/Container'
import useTheme from '@material-ui/core/styles/useTheme'
import CollectionsProvider from './context'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import AccessDenied from '../../components/access-denied'
import Header from './header'
import Loading from '../../components/loading'

export default () => {
  const theme = useTheme()
  const isAuthenticated = useContext(authenticationContext).authenticate()
  const { hasPermission } = useContext(authorizationContext)

  if (!isAuthenticated) {
    return <Loading />
  }

  if (!hasPermission('/data-lists')) {
    return (
      <div style={{ marginTop: theme.spacing(2) }}>
        <AccessDenied requiredPermission="/data-lists" />
      </div>
    )
  }

  return (
    <CollectionsProvider>
      <Header />
      <div style={{ marginTop: theme.spacing(2) }} />
      <Container style={{ minHeight: 1000 }}>hi</Container>
      <div style={{ marginTop: theme.spacing(2) }} />
    </CollectionsProvider>
  )
}
