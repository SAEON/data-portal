import { useState, useContext } from 'react'
import Collapse from '@mui/material/Collapse'
import { context as globalContext } from '../../../../../contexts/global'
import FilterHeader from './_header'
import { Div } from '../../../../../components/html-tags'
import FilterContent from './content'

export default ({ results, id, title, field, boost, defaultExpanded = false }) => {
  const { global } = useContext(globalContext)
  const { terms } = global
  const activeFilters = terms.filter(({ filterId }) => filterId === id)
  const [collapsed, setCollapsed] = useState(
    defaultExpanded === true ? false : !activeFilters.length
  )

  return (
    <Div sx={{ position: 'relative' }}>
      <FilterHeader title={title} collapsed={collapsed} setCollapsed={setCollapsed} />
      <Collapse
        timeout="auto"
        sx={{ width: '100%' }}
        key={`result-list-collapse-${id}`}
        unmountOnExit
        in={!collapsed}
      >
        <FilterContent
          filterId={id}
          field={field}
          boost={boost}
          results={results}
          activeFilters={activeFilters}
        />
      </Collapse>
    </Div>
  )
}
