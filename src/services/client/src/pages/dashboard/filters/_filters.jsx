import { useContext } from 'react'
import { context as dashboardContext } from '../context'
import AutoComplete from '../../../components/autocomplete'
import WithGqlQuery from '../../../hooks/with-gql-query'
import { gql } from '@apollo/client'
import Loading from '../../../components/loading'
import useStyles from '../style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()
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
            <AutoComplete
              multiple
              id={`filter-${filter.id}`}
              key={i}
              options={filter.values}
              selectedOptions={selectedFilters[filter.id].selectedValues}
              setOption={newValues => {
                let newSelectedFilters = JSON.parse(JSON.stringify(selectedFilters))
                newSelectedFilters[filter.id].selectedValues = newValues
                setSelectedFilters(newSelectedFilters)
              }}
              label={filter.name}
              className={clsx(classes.textField)} //applies to input TextField
              color="secondary"
              variant="filled"
            />
          ))
        }}
      </WithGqlQuery>
    </>
  )
}
