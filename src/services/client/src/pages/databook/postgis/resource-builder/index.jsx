import Header from './header'
import useStyles from './style'
import clsx from 'clsx'
import { useState } from 'react'
import Dashboards from './dashboards'
import Charts from './charts'

export default () => {
  const [active, setActive] = useState('dashboards')
  const classes = useStyles()
  return (
    <div className={clsx(classes.layout)}>
      <Header active={active} setActive={setActive} />
      {active === 'dashboards' && <Dashboards />}
      {active === 'charts' && <Charts />}
    </div>
  )
}
