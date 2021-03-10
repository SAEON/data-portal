import { forwardRef } from 'react'
import AceEditor from 'react-ace'
import debounce from '../../../../../lib/fns/debounce'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-pgsql'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/ext-language_tools'

export default forwardRef(({ editor, updateCache }, ref) => {
  const { sql, id } = editor

  const _updateCache = debounce(val => updateCache(val), 250)

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <AceEditor
        name={id}
        value={sql}
        scrollMargin={[0]}
        height="100%"
        width="100%"
        mode="pgsql"
        theme="sqlserver"
        onChange={val => {
          ref.current.sql = val
          _updateCache(val)
        }}
        editorProps={{
          $blockScrolling: false,
          $blockSelectEnabled: true,
        }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
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
  )
})
