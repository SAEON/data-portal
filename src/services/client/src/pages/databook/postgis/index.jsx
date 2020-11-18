import { gql } from '@apollo/client'
import WithGqlQuery from '../../../hooks/_with-gql-query'
import SplitPane from 'react-split-pane'
import useStyles from './style'
import clsx from 'clsx'
import Loading from '../../../components/loading'
import SchemaExplorer from './schema'
import DataExplorer from './data-explorer'

export default ({ databook }) => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root)} style={{ marginTop: 48 }}>
      <SplitPane minSize={130} defaultSize={300} split="vertical">
        {/* <SchemaExplorer /> */}
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

            return <SchemaExplorer data={data} />
          }}
        </WithGqlQuery>
        <DataExplorer databook={databook} />
      </SplitPane>
    </div>
  )
}
