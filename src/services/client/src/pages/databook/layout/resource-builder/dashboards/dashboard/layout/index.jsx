import Chart from './chart'
import Filter from './filter'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import useTheme from '@material-ui/core/styles/useTheme'
import useStyles from '../style'
import clsx from 'clsx'

export default ({ dashboardId, chartIds, filterIds, gridElRef, gridCache, gridItemsRef }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div style={{ height: 'calc(100% - 48px)', position: 'relative' }}>
      <Toolbar
        disableGutters
        style={{ marginRight: theme.spacing(4), marginLeft: theme.spacing(4), overflowX: 'auto' }}
        variant="dense"
      >
        {filterIds?.map(id => (
          <Filter key={id} filterId={id} dashboardId={dashboardId} />
        ))}
      </Toolbar>

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
    </div>
  )
}
