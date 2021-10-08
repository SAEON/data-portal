import Toolbar from '../../../components/toolbar-header'
import Delete from './_delete-records'
import NewRecords from '../components/new-records-dialog'
import useTheme from '@material-ui/core/styles/useTheme'

export default () => {
  const theme = useTheme()

  return (
    <Toolbar>
      <Delete />
      <div style={{ marginRight: theme.spacing(1) }} />

      <NewRecords />
      <div style={{ marginRight: theme.spacing(1) }} />
    </Toolbar>
  )
}
