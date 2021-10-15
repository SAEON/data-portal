import { useContext } from 'react'
import { context as dashboardContext } from '../context'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../components/loading'
import DropdownSelect from '../../../components/dropdown-select'
import SearchIcon from '@mui/icons-material/Search'

export default () => {
  const { selectedFilters, setSelectedFilters, filterIds } = useContext(dashboardContext)

  const { error, loading, data } = useQuery(
    gql`
      query filters($ids: [ID!]!) {
        filters(ids: $ids) {
          id
          name
          columnFiltered
          sql
          values
        }
      }
    `,
    {
      variables: { ids: filterIds },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return data.filters?.map((filter, i) => (
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
}
