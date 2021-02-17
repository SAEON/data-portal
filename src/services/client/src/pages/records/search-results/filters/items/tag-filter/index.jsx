import { useState, useContext } from 'react'
import Collapse from '@material-ui/core/Collapse'
import { context as globalContext } from '../../../../../../contexts/global'
import FilterHeader from './_header'
import FilterContent from './_content'

export default ({
  results,
  id,
  title,
  field,
  boost,
  sortBy = 'key',
  sortOrder = 'asc',
  style = {},
}) => {
  const { global } = useContext(globalContext)
  const { terms } = global
  const activeFilters = terms.filter(({ filterId }) => filterId === id)
  const [collapsed, setCollapsed] = useState(!activeFilters.length)

  return (
    <>
      <FilterHeader title={title} style={style} collapsed={collapsed} setCollapsed={setCollapsed} />
      <Collapse
        style={{ width: '100%' }}
        key={`result-list-collapse-${id}`}
        unmountOnExit
        in={!collapsed}
      >
        <FilterContent
          filterId={id}
          terms={terms}
          field={field}
          boost={boost}
          sortBy={sortBy}
          sortOrder={sortOrder}
          results={results}
          activeFilters={activeFilters}
        />
      </Collapse>
    </>
  )
}
