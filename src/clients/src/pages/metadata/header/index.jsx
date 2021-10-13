import Toolbar from '../../../components/toolbar-header'
import DeleteRecords from './delete-records'
import CreateRecords from './create-records'
import UpdateRecords from './update-records'
import useTheme from '@material-ui/core/styles/useTheme'
import Divider from '@material-ui/core/Divider'

export default () => {
  const theme = useTheme()

  return (
    <Toolbar>
      <Divider orientation="vertical" />
      <div style={{ marginRight: theme.spacing(1) }} />
      <UpdateRecords />
      <div style={{ marginRight: theme.spacing(1) }} />
      <CreateRecords />
      <div style={{ marginRight: theme.spacing(1) }} />
      <DeleteRecords />
      <div style={{ marginRight: theme.spacing(1) }} />
    </Toolbar>
  )
}
