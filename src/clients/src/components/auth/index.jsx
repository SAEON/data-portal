import { useContext } from 'react'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import Loading from '../../components/loading'
import AccessDenied from '../../components/access-denied'
import { useTheme } from '@mui/material/styles'

export default ({ requiredPermission, children }) => {
  const theme = useTheme()
  const isAuthenticated = useContext(authenticationContext).authenticate()
  const { hasPermission } = useContext(authorizationContext)

  if (!isAuthenticated) {
    return <Loading />
  }

  if (!hasPermission(requiredPermission)) {
    return (
      <div style={{ marginTop: theme.spacing(2) }}>
        <AccessDenied requiredPermission={requiredPermission} />
      </div>
    )
  }

  return children
}
