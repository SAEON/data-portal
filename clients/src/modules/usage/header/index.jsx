import Header from '../../../components/toolbar-header'
import Download from './_download'
import Divider from '@mui/material/Divider'
import { Div } from '../../../components/html-tags'

export default () => {
  return (
    <>
      <Header sx={{ display: 'flex' }}>
        <Div sx={{ marginLeft: 'auto' }} />
        <Divider flexItem orientation="vertical" sx={{ mr: theme => theme.spacing(1) }} />
        <Download />
        <Div sx={{ mr: theme => theme.spacing(1) }} />
      </Header>
    </>
  )
}
