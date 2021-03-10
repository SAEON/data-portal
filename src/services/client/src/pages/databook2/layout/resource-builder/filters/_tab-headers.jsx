import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'
import useStyles from '../../../style'
import clsx from 'clsx'
import CreateFilterButton from './_create-filter-button'

export default ({ filters, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()
  return (
    <Fade in={true} key={'filters-in'}>
      <div style={{ display: 'flex' }}>
        <Tabs
          indicatorColor="primary"
          variant={filters.length > 5 ? 'scrollable' : 'standard'}
          value={activeTabIndex}
          onChange={(event, newValue) => setActiveTabIndex(newValue)}
        >
          {filters.map(({ id }, i) => (
            <Tab
              key={id}
              className={clsx(classes.tab)}
              label={
                <Tooltip title={`Filter ${id}`}>
                  <Avatar className={clsx(classes.smallAvatar, classes.purple)} variant="circular">
                    {i + 1}
                  </Avatar>
                </Tooltip>
              }
              id={`tab-${id}`}
            />
          ))}
        </Tabs>
        {/* ADD FILTER TAB BUTTON */}
        <div style={{ alignSelf: 'center' }}>
          <CreateFilterButton />
        </div>
      </div>
    </Fade>
  )
}
