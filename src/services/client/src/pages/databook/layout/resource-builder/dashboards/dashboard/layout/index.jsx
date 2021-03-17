import Chart from './chart'
import Filter from './filter'
import Grid from '@material-ui/core/Grid'
import useStyles from '../style'
import clsx from 'clsx'

export default ({ dashboardId, chartIds, filterIds, gridElRef, gridCache, gridItemsRef }) => {
  const classes = useStyles()

  return (
    <>
      <Grid container justify="center">
        {filterIds?.map(id => (
          <Filter key={id} filterId={id} dashboardId={dashboardId} />
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
                ref={gridItemsRef.current[id]}
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
                    <Chart id={id} dashboardId={dashboardId} />
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
