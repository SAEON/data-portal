import { gql } from '@apollo/client'
import WithGqlQuery from '../../../hooks/_with-gql-query'
import SplitPane from 'react-split-pane'
import useStyles from './style'
import clsx from 'clsx'
import Loading from '../../../components/loading'
import SchemaExplorer from './schema'
import DashboardBuilder from './dashboard-builder'
import DataExplorer from './data-explorer'

export default ({ databook }) => {
  const classes = useStyles()
  console.log('rendering postgis')

  return (
    <div className={clsx(classes.root)} style={{ marginTop: 48 }}>
      <SplitPane minSize={100} defaultSize={250} split="vertical">
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

        <div>
          <SplitPane primary="first" split="vertical" defaultSize={1000}>
            <DataExplorer databook={databook} />
            <DashboardBuilder />
          </SplitPane>
        </div>
      </SplitPane>
    </div>
  )
}
