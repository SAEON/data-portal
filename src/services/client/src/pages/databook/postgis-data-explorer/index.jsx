import { gql } from '@apollo/client'
import WithGqlQuery from '../../../hooks/_with-gql-query'
import SplitPane from 'react-split-pane'
import useStyles from './style'
import clsx from 'clsx'
import Loading from '../../../components/loading'
import TreeView from './schema'
import SqlEditor from './sql-editor'
import ResultsTable from './results-table'
import DashboardBuilder from './dashboard-builder'

export default ({ databook }) => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root)} style={{ marginTop: 48 }}>
      <SplitPane minSize={100} defaultSize={250} split="vertical">
        <WithGqlQuery
          QUERY={gql`
            query($id: ID!) {
              browserClient {
                databook(id: $id) {
                  id
                  schema
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

            return <TreeView data={data} />
          }}
        </WithGqlQuery>

        <div>
          <SplitPane primary="first" split="vertical" defaultSize={1000}>
            <SplitPane split="horizontal" minSize={400}>
              <div className={clsx(classes.root)}>
                <SqlEditor />
              </div>
              <ResultsTable>{JSON.stringify(databook)}</ResultsTable>
            </SplitPane>
            <DashboardBuilder />
          </SplitPane>
        </div>
      </SplitPane>
    </div>
  )
}
