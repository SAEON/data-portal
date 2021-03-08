import { useContext } from 'react'
import { context as authContext } from '../../contexts/authentication'
import DatabookProvider from './contexts/databook-provider'
import SchemaProvider from './contexts/schema-provider'
import DataProvider from './contexts/data-provider'
import { setShareLink } from '../../hooks/use-share-link'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import Layout from './layout'
import useStyles from './style'
import clsx from 'clsx'

export default ({ id }) => {
  const classes = useStyles()
  const isAuthenticated = useContext(authContext).authenticate()

  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/databook?id=${id}`,
    params: false,
  })

  if (!isAuthenticated) {
    return null
  }

  return (
    <div
      className={clsx(classes.layout, {
        [classes.pushDown]: !window.location.pathname.includes('/render'),
      })}
    >
      <DatabookProvider id={id}>
        <SchemaProvider>
          <DataProvider>
            <Layout />
          </DataProvider>
        </SchemaProvider>
      </DatabookProvider>
    </div>
  )
}
