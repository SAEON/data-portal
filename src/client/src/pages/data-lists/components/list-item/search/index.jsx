import { useContext } from 'react'
import { context as listContext } from '../_context'
import CardContent from '@material-ui/core/CardContent'
import useTheme from '@material-ui/core/styles/useTheme'
import Collapse from '../../../../../components/collapse'
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-min-noconflict/mode-json'
import 'ace-builds/src-min-noconflict/theme-vibrant_ink'

export default () => {
  const { update, search, id } = useContext(listContext)
  const theme = useTheme()

  return (
    <Collapse title="Search" subheader="Configure list search DSL object" defaultExpanded>
      <CardContent>
        <div
          style={{ padding: theme.spacing(1), height: 400, width: '100%', overflow: 'auto' }}
          contentEditable
        >
          <AceEditor
            height="100%"
            width="100%"
            name={`ace-editor-${id}`}
            value={JSON.stringify(search, null, 2)}
            editorProps={{ $blockScrolling: false, $blockSelectEnabled: true }}
            mode="json"
            theme="vibrant_ink"
            setOptions={{
              wrap: true,
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              firstLineNumber: 1,
              newLineMode: 'unix',
              useSoftTabs: true,
              tabSize: 2,
              scrollPastEnd: 8,
              selectionStyle: 'line',
              highlightActiveLine: true,
              highlightSelectedWord: true,
              cursorStyle: 'ace',
              animatedScroll: true,
              displayIndentGuides: true,
              fadeFoldWidgets: true,
              vScrollBarAlwaysVisible: false,
              scrollSpeed: 1,
              highlightGutterLine: true,
              fontSize: 12,
              fixedWidthGutter: true,
              showPrintMargin: false,
            }}
          />
        </div>
      </CardContent>
    </Collapse>
  )
}
