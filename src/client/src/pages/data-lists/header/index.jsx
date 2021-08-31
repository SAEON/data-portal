import Header from '../../../components/toolbar-header'
import NewList from './_new-list'
import DownloadDetails from './_download'
import useTheme from '@material-ui/core/styles/useTheme'
import Divider from '@material-ui/core/Divider'

export default () => {
  const theme = useTheme()

  return (
    <>
      <Header style={{ display: 'flex' }}>
        <div style={{ marginLeft: 'auto' }} />
        <Divider flexItem orientation="vertical" style={{ marginRight: theme.spacing(1) }} />
        <DownloadDetails />
        <Divider
          flexItem
          orientation="vertical"
          style={{ marginRight: theme.spacing(1), marginLeft: theme.spacing(1) }}
        />
        <NewList />
        <div style={{ marginRight: theme.spacing(1) }} />
      </Header>
    </>
  )
}
