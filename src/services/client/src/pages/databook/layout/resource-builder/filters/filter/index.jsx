import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Delete from './_delete'
import Filter from './_filter'
import useStyles from './style'
import clsx from 'clsx'

export default ({ filter, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()
  const { id, name } = filter

  return (
    <>
      {/* Header */}
      <Toolbar disableGutters className={clsx(classes.toolbar)} variant={'dense'}>
        <div style={{ display: 'flex', width: '100%' }}>
          <Typography
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            variant="overline"
          >
            {name || id}
          </Typography>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          <Delete id={id} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
        </div>
      </Toolbar>

      {/* Filter */}
      <div style={{ height: 'calc(100% - 48px)', margin: 0, position: 'relative' }}>
        <Filter filter={filter} />
      </div>
    </>
  )
}
