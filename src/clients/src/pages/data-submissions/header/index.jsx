import Toolbar from '../../../components/toolbar-header'
import Button from '@material-ui/core/Button'
import AddIcon from 'mdi-react/AddBoxIcon'
import Delete from './_delete-records'
import useTheme from '@material-ui/core/styles/useTheme'

export default () => {
  const theme = useTheme()

  return (
    <Toolbar>
      <Delete />
      <div style={{ marginRight: theme.spacing(1) }} />

      <Button
        onClick={() => alert('Not implemented yet')}
        startIcon={<AddIcon size={18} />}
        size="small"
        variant="text"
      >
        New record
      </Button>
      <div style={{ marginRight: theme.spacing(1) }} />
    </Toolbar>
  )
}
