import { useContext } from 'react'
import { context as dashboardContext } from '../context'
import WithGqlQuery from '../../../hooks/with-gql-query'
import { gql } from '@apollo/client'
import Loading from '../../../components/loading'
import DropdownSelect from '../../../components/dropdown-select'
import SearchIcon from '@material-ui/icons/Search'

export default () => {
  const { selectedFilters, setSelectedFilters, filterIds } = useContext(dashboardContext)
  return (
    <>
      <WithGqlQuery
        QUERY={gql`
          query filters($ids: [ID!]) {
            filters(ids: $ids) {
              id
              name
              columnFiltered
              sql
              values
            }
          }
        `}
        variables={{ ids: filterIds }}
      >
        {({ error, loading, data }) => {
          if (loading) {
            return <Loading />
          }

          if (error) {
            console.error(error)
            throw error
          }
          const { filters } = data
          return filters.map((filter, i) => (
            <DropdownSelect
              key={i}
              options={filter.values}
              selectedOptions={selectedFilters[filter.id].selectedValues}
              setOption={newValues => {
                let newSelectedFilters = JSON.parse(JSON.stringify(selectedFilters))
                newSelectedFilters[filter.id].selectedValues = newValues
                setSelectedFilters(newSelectedFilters)
              }}
              label={filter.name}
              icon={SearchIcon}
            />
          ))
        }}
      </WithGqlQuery>
    </>
  )
}
