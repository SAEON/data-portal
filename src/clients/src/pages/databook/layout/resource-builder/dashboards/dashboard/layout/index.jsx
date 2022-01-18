import Chart from './chart'
import Filter from './filter'
import Toolbar from '@mui/material/Toolbar'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'

const GridContainer = styled('div')(({ theme }) => ({
  height: 'calc(100% - 64px)',
  position: 'relative',
  padding: theme.spacing(1),
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  border: `1px solid ${theme.palette.grey[200]}`,
  boxSizing: 'border-box',
}))

const Grid = styled('div')({
  height: '100% !important',
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
})

const GridItemContent = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
}))

export default ({ dashboardId, chartIds, filterIds, gridElRef, gridCache, gridItemsRef }) => {
  return (
    <div style={{ height: 'calc(100% - 48px)', position: 'relative' }}>
      <Toolbar
        disableGutters
        sx={theme => ({
          marginRight: theme.spacing(4),
          marginLeft: theme.spacing(4),
          overflowX: 'auto',
        })}
        variant="dense"
      >
        {filterIds?.map(id => (
          <Filter key={id} filterId={id} dashboardId={dashboardId} />
        ))}
      </Toolbar>

      <GridContainer>
        <Grid ref={gridElRef} className={clsx('grid-stack')}>
          {chartIds?.map(id => {
            const hydratedState = (gridCache[dashboardId] || []).find(
              ({ content }) => content.id === id
            )
            return (
              <div
                ref={gridItemsRef.current[id]}
                key={id}
                className={clsx('grid-stack-item')}
                {...Object.fromEntries(
                  Object.entries(hydratedState || {})
                    .filter(([key]) => key !== 'content')
                    .map(([key, value]) => [`gs-${key}`, value])
                )}
              >
                <GridItemContent className={clsx('grid-stack-item-content')}>
                  <span id={id} data-type={'Chart'}>
                    <Chart id={id} dashboardId={dashboardId} />
                  </span>
                </GridItemContent>
              </div>
            )
          })}
        </Grid>
      </GridContainer>
    </div>
  )
}
