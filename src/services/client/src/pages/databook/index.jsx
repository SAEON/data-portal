import { gql } from '@apollo/client'
import WithGqlQuery from '../../hooks/_with-gql-query'
import Loading from '../../components/loading'
import SplitPane from 'react-split-pane'
import useStyles from './style'
import clsx from 'clsx'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/ext-language_tools'
import { Toolbar } from '@material-ui/core'

const POLLING_INTERVAL = 1000

export default ({ id }) => {
  const classes = useStyles()

  return (
    /**
     * Get the Mongo doc describing the databook
     * Keep polling until all the tables are ready
     */
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          browserClient {
            databook(id: $id) {
              id
              doc
            }
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data, startPolling, stopPolling }) => {
        if (error) {
          throw new Error(`Error loading databook ${id}. ${error}`)
        }

        if (loading) {
          return <Loading />
        }

        const { doc: databook } = data.browserClient.databook
        const { tables } = databook

        let tablesReady = 0
        let tablesNotReady = 0
        Object.entries(tables).forEach(([, { ready }]) => {
          if (ready) {
            tablesReady += 1
          } else {
            tablesNotReady += 1
          }
        })

        const ready = tablesNotReady > 0 ? false : true

        if (ready) {
          stopPolling()
        } else {
          startPolling(POLLING_INTERVAL)
        }

        return !ready ? (
          `Loaded ${tablesReady} of ${Object.entries(tables).length} tables. Please wait...`
        ) : (
          <div className={clsx(classes.root)} style={{ marginTop: 48 }}>
            <SplitPane minSize={100} defaultSize={250} split="vertical">
              <div>List of tables</div>
              <div>
                <SplitPane primary="first" split="vertical" defaultSize={1000}>
                  <SplitPane split="horizontal" minSize={400}>
                    <div className={clsx(classes.root)}>
                      <Toolbar variant="dense" className={clsx(classes.toolbar)} />
                      <AceEditor
                        setOptions={{
                          enableBasicAutocompletion: true,
                          enableLiveAutocompletion: true,
                          enableSnippets: true,
                        }}
                        tabSize={2}
                        placeholder="Select * from ..."
                        scrollMargin={[0]}
                        showPrintMargin={false}
                        height="calc(100% - 48px)"
                        width="100%"
                        mode="sql"
                        theme="sql-server"
                        onChange={() => console.log('hi')}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                      />
                    </div>
                    <div>{JSON.stringify(data)}</div>
                  </SplitPane>
                  <div>Dashboard builder</div>
                </SplitPane>
              </div>
            </SplitPane>
          </div>
        )
      }}
    </WithGqlQuery>
  )
}
