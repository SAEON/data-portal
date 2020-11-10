import { gql } from '@apollo/client'
import WithGqlQuery from '../../../hooks/_with-gql-query'
import SplitPane from 'react-split-pane'
import useStyles from './style'
import clsx from 'clsx'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/ext-language_tools'
import { Toolbar } from '@material-ui/core'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/ext-language_tools'
import Loading from '../../../components/loading'
import TreeView from './tree-view'

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
              <div>{JSON.stringify(databook)}</div>
            </SplitPane>
            <div>Dashboard builder</div>
          </SplitPane>
        </div>
      </SplitPane>
    </div>
  )
}
