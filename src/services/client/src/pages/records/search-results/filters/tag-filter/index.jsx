import { useState, useContext, lazy, Suspense } from 'react'
import Collapse from '@material-ui/core/Collapse'
import { context as globalContext } from '../../../../../contexts/global'
import FilterHeader from './_header'
import Loading from '../../../../../components/loading'

const FilterContent = lazy(() => import('./content'))

export default ({ results, id, title, field, boost, style = {} }) => {
  const { global } = useContext(globalContext)
  const { terms } = global
  const activeFilters = terms.filter(({ filterId }) => filterId === id)
  const [collapsed, setCollapsed] = useState(!activeFilters.length)

  return (
    <div style={{ position: 'relative' }}>
      <FilterHeader title={title} style={style} collapsed={collapsed} setCollapsed={setCollapsed} />
      <Collapse
        style={{ width: '100%' }}
        key={`result-list-collapse-${id}`}
        unmountOnExit
        in={!collapsed}
      >
        <Suspense fallback={<Loading />}>
          <FilterContent
            filterId={id}
            field={field}
            boost={boost}
            results={results}
            activeFilters={activeFilters}
          />
        </Suspense>
      </Collapse>
    </div>
  )
}
