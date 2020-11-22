import { useContext } from 'react'
import { context as databookContext } from '../../context'
import { gql } from '@apollo/client'
import Loading from '../../../../components/loading'
import { WithGqlQuery } from '../../../../hooks'
import TreeView from './tree-view/index'

/* STEVEN TODO: Map array of databooks passed here as <TreeView/>'s instead of just a single <TreeView/> 
  Its possible the extra databooks aren't being passed here through props. To look into it further*/

export default () => {
  const { databook } = useContext(databookContext)
  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          browserClient {
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
                    column_description
                  }
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
          <div style={{ backgroundColor: 'rgb(255,255,255)', padding: '3px', height: '100%' }}>
            <TreeView style={{}} schema={data.browserClient.databook.schema}></TreeView>
          </div>
        )
      }}
    </WithGqlQuery>
  )
}
