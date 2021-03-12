import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Fade from '@material-ui/core/Fade'
import useStyles from '../../../../style'
import clsx from 'clsx'
import CreateFilterButton from './_create-filter-button'
import Label from '../../../../components/tab-label'

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
                <Label title={`Filter ${id}`} color="purple">
                  {i + 1}
                </Label>
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
