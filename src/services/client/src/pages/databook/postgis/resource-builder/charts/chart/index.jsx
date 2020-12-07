import { Toolbar, Typography } from '@material-ui/core'
import DeleteButton from './_delete-button'
import EChart from '../../../../../chart'

export default ({ chart, activeTabIndex, setActiveTabIndex }) => {
  const { id } = chart
  return (
    <>
      <Toolbar variant={'dense'}>
        <Typography>{id}</Typography>
      </Toolbar>
      <EChart id={id} />

      <DeleteButton id={id} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
    </>
  )
}
