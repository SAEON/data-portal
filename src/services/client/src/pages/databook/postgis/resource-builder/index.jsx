import { useRef } from 'react'
import Header from './header'
import useStyles from '../../style'
import clsx from 'clsx'
import { useState } from 'react'
import Dashboards from './dashboards'
import Charts from './charts'

export default () => {
  const [active, setActive] = useState('dashboards')
  const classes = useStyles()
  const tabsContainerRef = useRef()
  return (
    <div className={clsx(classes.layout, classes.bg)}>
      <Header ref={tabsContainerRef} active={active} setActive={setActive} />
      {active === 'dashboards' && <Dashboards ref={tabsContainerRef} />}
      {active === 'charts' && <Charts />}
    </div>
  )
}
