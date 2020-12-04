import { forwardRef } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-pgsql'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/ext-language_tools'

export default forwardRef(({ sql }, ref) => {
  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <AceEditor
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={sql}
        tabSize={2}
        placeholder="Select * from ..."
        scrollMargin={[0]}
        showPrintMargin={false}
        height="100%"
        width="100%"
        mode="pgsql"
        theme="sqlserver"
        onChange={val => {
          ref.current.sql = val
        }}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  )
})
