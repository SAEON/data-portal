import { useState, useContext, lazy, Suspense } from 'react'
import Collapse from '@mui/material/Collapse'
import { context as globalContext } from '../../../../../contexts/global'
import FilterHeader from './_header'
import Loading from '../../../../../components/loading'
import { Div } from '../../../../../components/html-tags'

const FilterContent = lazy(() => import('./content'))

export default ({ results, id, title, field, boost, sx = {} }) => {
  const { global } = useContext(globalContext)
  const { terms } = global
  const activeFilters = terms.filter(({ filterId }) => filterId === id)
  const [collapsed, setCollapsed] = useState(!activeFilters.length)

  return (
    <Div sx={{ position: 'relative' }}>
      <FilterHeader title={title} sx={sx} collapsed={collapsed} setCollapsed={setCollapsed} />
      <Collapse
        timeout="auto"
        sx={{ width: '100%' }}
        key={`result-list-collapse-${id}`}
        unmountOnExit
        in={!collapsed}
      >
        <Suspense
          fallback={
            <Div>
              <Loading />
            </Div>
          }
        >
          <FilterContent
            filterId={id}
            field={field}
            boost={boost}
            results={results}
            activeFilters={activeFilters}
          />
        </Suspense>
      </Collapse>
    </Div>
  )
}
