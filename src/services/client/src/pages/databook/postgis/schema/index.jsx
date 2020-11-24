import { useContext } from 'react'
import { context as databookContext } from '../../context'
import { gql } from '@apollo/client'
import Loading from '../../../../components/loading'
import { WithGqlQuery } from '../../../../hooks'
import TreeView from './tree-view/index'

export default () => {
  const { databook } = useContext(databookContext)
  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          databook(id: $id) {
            id
            schema {
              id
              tables {
                id
                fields {
                  id
                  column_name
                  data_type
                }
              }
            }
          }
        }
      `}
      variables={{ id: databook.doc._id }}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw error
        }

        if (loading) {
          return <Loading />
        }
        return (
          <div
            style={{
              backgroundColor: 'rgb(255,255,255)',
              padding: '3px',
              height: '100%',
              borderRight: '1px solid rgb(228, 231, 234)',
            }}
          >
            <TreeView schema={data.databook.schema} />
          </div>
        )
      }}
    </WithGqlQuery>
  )
}
