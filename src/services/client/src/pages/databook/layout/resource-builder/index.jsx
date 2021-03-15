import { useContext, useState } from 'react'
import Header from './header'
import useStyles from '../../style'
import clsx from 'clsx'
import Dashboards from './dashboards'
import Charts from './charts'
import Filters from './filters'
import Fade from '@material-ui/core/Fade'
import useLocalStorage from '../../../../hooks/use-localstorage'
import { context as databookContext } from '../../contexts/databook-provider'

export default () => {
  const { id } = useContext(databookContext)
  const [ref, setRef] = useState()
  const [active, setActive] = useLocalStorage(`${id}-active-resource-builder-context`, 'dashboards')
  const classes = useStyles()

  return (
    <div className={clsx(classes.layout, classes.bg)}>
      <div style={{ position: 'relative', height: '100%' }}>
        {/* TOOLBAR */}
        <Header ref={el => setRef(el)} active={active} setActive={setActive} />

        {/* CONTROLS */}
        <div style={{ height: 'calc(100% - 48px)', position: 'relative' }}>
          {/* DASHBOARD EDITOR */}
          {active === 'dashboards' && (
            <Fade
              in={active === 'dashboards'}
              unmountOnExit
              mountOnEnter={false}
              key="dasboards-in"
            >
              <span>
                <Dashboards ref={ref} />
              </span>
            </Fade>
          )}

          {/* CHART EDITOR */}
          {active === 'charts' && (
            <Fade in={active === 'charts'} unmountOnExit mountOnEnter={false} key="charts-in">
              <span>
                <Charts ref={ref} />
              </span>
            </Fade>
          )}

          {/* FILTER EDITOR */}
          {active === 'filters' && (
            <Fade in={active === 'filters'} unmountOnExit mountOnEnter={false} key="filters-in">
              <span>
                <Filters ref={ref} />
              </span>
            </Fade>
          )}
        </div>
      </div>
    </div>
  )
}
