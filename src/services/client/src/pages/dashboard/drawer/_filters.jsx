import { useContext, Fragment } from 'react'
import { context as dashboardContext } from '../context'
import AutoComplete from '../../../components/autocomplete'
import WithGqlQuery from '../../../hooks/with-gql-query'
import { gql } from '@apollo/client'
import Loading from '../../../components/loading'
import useStyles from '../style'
import clsx from 'clsx'
import { Divider, List, ListItem } from '@material-ui/core'

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
          return (
            <List>
              {filters.map((filter, i) => (
                <Fragment key={i}>
                  <ListItem>
                    <AutoComplete
                      multiple
                      id={`filter-${filter.id}`}
                      options={filter.values}
                      selectedOptions={selectedFilters[filter.id].selectedValues}
                      setOption={newValues => {
                        let newSelectedFilters = JSON.parse(JSON.stringify(selectedFilters))
                        newSelectedFilters[filter.id].selectedValues = newValues
                        setSelectedFilters(newSelectedFilters)
                      }}
                      label={filter.name}
                      className={clsx(classes.textField)} //applies to input TextField
                      variant="filled"
                    />
                  </ListItem>
                  {/* <Divider /> */}
                </Fragment>
              ))}
            </List>
          )
        }}
      </WithGqlQuery>
    </>
  )
}
