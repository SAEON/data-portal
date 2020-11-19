import { useState, useContext } from 'react'
import { context as databookContext } from '../../context'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/ext-language_tools'
import { Toolbar, IconButton } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PlayIcon from 'mdi-react/PlayArrowIcon'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const { sql, setSql } = useContext(databookContext)
  const [_sql, _setSql] = useState(sql)
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <Toolbar variant="dense" className={clsx(classes.toolbar)}>
        <IconButton onClick={() => setSql(_sql)} size="small">
          <PlayIcon style={{ color: theme.palette.success.main }} />
        </IconButton>
      </Toolbar>
      <AceEditor
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={_sql}
        tabSize={2}
        placeholder="Select * from ..."
        scrollMargin={[0]}
        showPrintMargin={false}
        height="calc(100% - 48px)"
        width="100%"
        mode="sql"
        theme="sql-server"
        onChange={val => _setSql(val)}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </>
  )
}
