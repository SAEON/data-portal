import ChartStub from './chart'
import FilterStub from './filter'
import Grid from '@material-ui/core/Grid'
import useStyles from '../style'
import clsx from 'clsx'

export default ({ gridElRef, chartIds, gridCache, dashboard, refs }) => {
  const { id: dashboardId, filters: filterIds = [] } = dashboard
  const classes = useStyles()

  return (
    <>
      <Grid container justify="center">
        {filterIds?.map(id => (
          <FilterStub key={id} filterId={id} dashboard={dashboard} />
        ))}
      </Grid>
      <div className={clsx(classes.gridContainer)}>
        <div ref={gridElRef} className={clsx('grid-stack', classes.grid)}>
          {chartIds?.map(id => {
            const hydratedState = (gridCache[dashboardId] || []).find(
              ({ content }) => content.id === id
            )
            return (
              <div
                ref={refs.current[id]}
                key={id}
                className={clsx('grid-stack-item', classes.gridItem)}
                {...Object.fromEntries(
                  Object.entries(hydratedState || {})
                    .filter(([key]) => key !== 'content')
                    .map(([key, value]) => [`gs-${key}`, value])
                )}
              >
                <div className={clsx('grid-stack-item-content', classes.gridItemContent)}>
                  <span id={id} data-type={'Chart'}>
                    <ChartStub chart={id} dashboard={dashboard} />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
