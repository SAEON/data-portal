import { useContext } from 'react'
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
      <Layout />
    </ListsProvider>
  )
}
