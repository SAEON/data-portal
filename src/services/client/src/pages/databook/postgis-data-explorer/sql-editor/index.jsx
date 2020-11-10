import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/ext-language_tools'
import { Toolbar } from '@material-ui/core'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/ext-language_tools'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()

  return (
    <>
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
    </>
  )
}
