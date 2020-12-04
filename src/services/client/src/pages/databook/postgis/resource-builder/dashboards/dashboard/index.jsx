import { Toolbar, Typography } from '@material-ui/core'
import AddChartButton from './_add-chart-button'
import DeleteButton from './_delete-button'
import ShareButton from './_share-button'

export default ({ dashboard, setActiveTabIndex }) => {
  const { id, charts = [] } = dashboard
  return (
    <>
      <Toolbar variant={'dense'}>
        <Typography>{id}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <AddChartButton dashboard={dashboard} />
        <span style={{ marginRight: 16 }} />
        <ShareButton id={id} />
      </Toolbar>

      {charts?.map(({ id }) => {
        return (
          <div key={id} item xs={12}>
            Chart: {id}
          </div>
        )
      })}

      <DeleteButton id={id} setActiveTabIndex={setActiveTabIndex} />
    </>
  )
}
