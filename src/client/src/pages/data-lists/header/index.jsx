import Header from '../../../components/toolbar-header'
import NewCollection from './_new-collection'
import useTheme from '@material-ui/core/styles/useTheme'
import Divider from '@material-ui/core/Divider'

export default () => {
  const theme = useTheme()

  return (
    <>
      <Header style={{ display: 'flex' }}>
        <div style={{ marginLeft: 'auto' }} />
        <Divider flexItem orientation="vertical" style={{ marginRight: theme.spacing(1) }} />
        <NewCollection />
        <div style={{ marginRight: theme.spacing(1) }} />
      </Header>
    </>
  )
}
