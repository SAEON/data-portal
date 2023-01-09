import Header from '../../../components/toolbar-header'
import NewList from './new-list'
import DownloadDetails from './_download'
import Divider from '@mui/material/Divider'
import { Div } from '../../../components/html-tags'
import Filter from './filter'

export default () => {
  return (
    <Header sx={{ display: 'flex' }}>
      <Div sx={{ mx: theme => theme.spacing(1), flex: 1 }}>
        <Filter />
      </Div>
      <Divider flexItem orientation="vertical" sx={{ mr: theme => theme.spacing(1) }} />
      <DownloadDetails />
      <Divider
        flexItem
        orientation="vertical"
        sx={{ mr: theme => theme.spacing(1), ml: theme => theme.spacing(1) }}
      />
      <NewList />
      <Div sx={{ mr: theme => theme.spacing(1) }} />
    </Header>
  )
}
