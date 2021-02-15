import { useRef } from 'react'
import Header from './header'
import useStyles from '../../style'
import clsx from 'clsx'
import { useState } from 'react'
import Dashboards from './dashboards'
import Charts from './charts'
import Filters from './filters'
import Fade from '@material-ui/core/Fade'

export default () => {
  const [active, setActive] = useState('dashboards')
  const classes = useStyles()
  const tabsContainerRef = useRef()

  return (
    <div className={clsx(classes.layout, classes.bg)}>
      <div style={{ position: 'relative', height: '100%' }}>
        <Header ref={tabsContainerRef} active={active} setActive={setActive} />
        <div style={{ height: 'calc(100% - 48px)', position: 'relative' }}>
          {active === 'dashboards' && (
            <Fade in={active === 'dashboards'} key="dasboards-in">
              <span>
                <Dashboards ref={tabsContainerRef} />
              </span>
            </Fade>
          )}
          {active === 'charts' && (
            <Fade in={active === 'charts'} key="charts-in">
              <span>
                <Charts ref={tabsContainerRef} />
              </span>
            </Fade>
          )}
          {active === 'filters' && (
            <Fade in={active === 'filters'} key="filters-in">
              <span>
                <Filters ref={tabsContainerRef} />
              </span>
            </Fade>
          )}
        </div>
      </div>
    </div>
  )
}
