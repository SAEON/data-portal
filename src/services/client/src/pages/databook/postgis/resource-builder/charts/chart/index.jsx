import { Toolbar, Typography } from '@material-ui/core'
import DeleteButton from './_delete-button'

export default ({ chart, setActiveTabIndex }) => {
  const { id, charts = [] } = chart
  return (
    <>
      <Toolbar variant={'dense'}>
        <Typography>{id}</Typography>
      </Toolbar>

      <DeleteButton id={id} setActiveTabIndex={setActiveTabIndex} />
    </>
  )
}
