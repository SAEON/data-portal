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

/**
 * TODO
 *  1. Request IDs of prepared datasets (done)
 *  2. Request schema's of these prepared datasets
 *  3. Subscribe to more dataset schemas (since they may take a while)
 *  4. Now the client can call the data?
 */

export default () => {
  const classes = useStyles()

  return (
    <WithGqlQuery
      QUERY={gql`
        query($text: String, $size: Int) {
          catalogue {
            id
            records(text: $text, size: $size) {
              nodes {
                dataId
              }
            }
          }
        }
      `}
      variables={{
        text: 'rivers',
        size: 20,
      }}
    >
      {({ error, loading, data, subscribeToMore }) => {
        if (error) {
          throw error
        }

        if (loading) {
          return <Loading />
        }

        subscribeToMore({
          document: gql`
            subscription {
              dataReady
            }
          `,
          variables: {},
          updateQuery: (prev, { subscriptionData }) => {
            const dataId = subscriptionData.data.dataReady
            console.log('prev', prev)
            console.log('new ready', dataId)
          },
        })

        return (
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
                        scrollMargin={100}
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
