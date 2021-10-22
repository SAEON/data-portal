import { useContext } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import CodeIcon from 'mdi-react/CodeJsonIcon'
import FormIcon from 'mdi-react/FormTextboxIcon'
import { useTheme } from '@mui/material/styles'
import { context as editorContext } from '../context'
import Typography from '@mui/material/Typography'

export default () => {
  const { activeEditor, setActiveEditor } = useContext(editorContext)
  const theme = useTheme()

  return (
    <Toolbar variant="dense" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Typography variant="overline">Edit metadata</Typography>
      <div style={{ marginLeft: 'auto' }} />
      <Button
        disabled={activeEditor === 'form'}
        onClick={() => setActiveEditor('form')}
        style={{ marginRight: theme.spacing(1) }}
        size="small"
        disableElevation
        variant="text"
        startIcon={<FormIcon size={18} />}
      >
        Form editor
      </Button>
      <Button
        disabled={activeEditor === 'json'}
        onClick={() => setActiveEditor('json')}
        size="small"
        disableElevation
        variant="text"
        startIcon={<CodeIcon size={18} />}
      >
        JSON editor
      </Button>
    </Toolbar>
  )
}
