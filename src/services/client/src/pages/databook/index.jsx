import { useContext } from 'react'
import { context as authContext } from '../../contexts/authentication'
import DatabookProvider from './contexts/databook-provider'
import SchemaProvider from './contexts/schema-provider'
import DataProvider from './contexts/data-provider'
import FiltersProvider from './contexts/filters-provider'
import ChartsProvider from './contexts/charts-provider'
import DashboardsProvider from './contexts/dashboards-provider'
import Wrapper from './wrapper'
import Layout from './layout'

export default ({ id }) => {
  const isAuthenticated = useContext(authContext).authenticate()

  if (!isAuthenticated) {
    return null
  }

  return (
    <Wrapper>
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
    </Wrapper>
  )
}
