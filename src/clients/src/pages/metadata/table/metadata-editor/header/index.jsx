import { useContext } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import CodeIcon from 'mdi-react/CodeJsonIcon'
import FormIcon from 'mdi-react/FormTextboxIcon'
import useTheme from '@material-ui/core/styles/useTheme'
import { context as editorContext } from '../_context'

export default () => {
  const { view, setView } = useContext(editorContext)
  const theme = useTheme()

  return (
    <Toolbar disableGutters variant="dense" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        disabled={view === 'form'}
        onClick={() => setView('form')}
        style={{ marginRight: theme.spacing(1) }}
        size="small"
        disableElevation
        variant="outlined"
        startIcon={<FormIcon size={18} />}
      >
        Form editor
      </Button>
      <Button
        disabled={view === 'json'}
        onClick={() => setView('json')}
        size="small"
        disableElevation
        variant="outlined"
        startIcon={<CodeIcon size={18} />}
      >
        JSON editor
      </Button>
    </Toolbar>
  )
}
