import AutoComplete from '../../../../components/autocomplete'
import QuickForm from '@saeon/quick-form'
import { WithGqlQuery } from '../../../../hooks'
import { gql } from '@apollo/client'
import Loading from '../../../../components/loading'
export default ({ filterIds }) => {
  console.log('filterIds', filterIds)
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
              selectedValues
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
          console.log('my data', data)
          const { filters } = data
          return filters.map((filter, i) => {
            return (
              <QuickForm selectedValues={[]} key={i}>
                {(update, { selectedValues }) => {
                  return (
                    <AutoComplete
                      multiple
                      id={`filter-${i}`}
                      options={filter.values}
                      selectedOptions={selectedValues}
                      setOption={newVal => {
                        update({ selectedValues: newVal })
                      }}
                      label={filter.name}
                    />
                  )
                }}
              </QuickForm>
            )
          })
        }}
      </WithGqlQuery>
    </>
  )
}

const onClick = async () => {
  setLoading(true)
  await client.mutate({
    mutation: gql`
      mutation($id: ID!, $layout: JSON) {
        updateDashboard(id: $id, layout: $layout) {
          id
          layout
        }
      }
    `,
    variables: {
      id: dashboard.id,
      layout: gridState,
    },
    update: (cache, { data }) => {
      const { dashboards } = cache.read({
        query: DASHBOARDS_QUERY,
        variables: {
          databookId,
        },
      })

      const updatedDashboards = [
        ...dashboards.map(d => {
          return Object.assign(
            {},
            { ...d },
            {
              layout: gridState, // TODO. for some reason the second time this mutation is called, data.updatedDashboard.layout is stale
            }
          )
        }),
      ]

      cache.writeQuery({
        query: DASHBOARDS_QUERY,
        data: {
          dashboards: updatedDashboards,
        },
      })
    },
  })
  setLoading(false)
}
