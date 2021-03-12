import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Delete from './_delete'
import Filter from './_filter'
import useStyles from './style'
import clsx from 'clsx'

export default ({ filter, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()
  const { id } = filter
  return (
    <>
      {/* Header */}
      <Toolbar className={clsx(classes.toolbar)} variant={'dense'}>
        <Typography>{id}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <Delete id={id} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
      </Toolbar>

      {/* Filter */}
      <div style={{ height: 'calc(100% - 48px)', margin: 0, position: 'relative' }}>
        <Filter filter={filter} />
      </div>
    </>
  )
}
