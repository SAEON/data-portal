import { useContext } from 'react'
import { context as authContext } from '../../contexts/authentication'
import DatabookProvider from './contexts/databook-provider'
import SchemaProvider from './contexts/schema-provider'
import DataProvider from './contexts/data-provider'
import FiltersProvider from './contexts/filters-provider'
import ChartsProvider from './contexts/charts-provider'
import DashboardsProvider from './contexts/dashboards-provider'
import Layout from './layout'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ id }) => {
  const theme = useTheme()
  const isAuthenticated = useContext(authContext).authenticate()

  if (!isAuthenticated) {
    return null
  }

  return (
    <div
      style={{
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <DatabookProvider id={id}>
        <SchemaProvider>
          <DataProvider>
            <FiltersProvider>
              <ChartsProvider>
                <DashboardsProvider>
                  <Layout />
                </DashboardsProvider>
              </ChartsProvider>
            </FiltersProvider>
          </DataProvider>
        </SchemaProvider>
      </DatabookProvider>
    </div>
  )
}
