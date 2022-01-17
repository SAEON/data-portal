import { useContext, useState } from 'react'
import Header from './header'
import Dashboards from './dashboards'
import Charts from './charts'
import Filters from './filters'
import Fade from '@mui/material/Fade'
import useLocalStorage from '../../../../hooks/use-localstorage'
import { context as databookContext } from '../../contexts/databook-provider'
import { styled } from '@mui/material/styles'

const Layout = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}))

export default () => {
  const { id } = useContext(databookContext)
  const [ref, setRef] = useState()
  const [active, setActive] = useLocalStorage(`${id}-active-resource-builder-context`, 'dashboards')

  return (
    <Layout>
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
              key="dashboards-in"
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
    </Layout>
  )
}
