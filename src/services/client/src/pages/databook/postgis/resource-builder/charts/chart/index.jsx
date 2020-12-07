import { Toolbar, Typography } from '@material-ui/core'
import DeleteButton from './_delete-button'
import EChart from '../../../../../chart'
import ShareButton from './_share-button'

export default ({ chart, activeTabIndex, setActiveTabIndex }) => {
  const { id } = chart
  return (
    <>
      <Toolbar variant={'dense'}>
        <Typography>{id}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <ShareButton id={id} />
      </Toolbar>
      <EChart id={id} />

      <DeleteButton id={id} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
    </>
  )
}
