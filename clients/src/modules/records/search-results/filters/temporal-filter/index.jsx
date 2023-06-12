import { useState, useContext, useRef } from 'react'
import Collapse from '@mui/material/Collapse'
import { context as searchContext } from '../../../../../contexts/search'
import FilterHeader from './_header'
import { Div } from '../../../../../components/html-tags'
import FilterContent from './content'
import { RegisterEventLog, makeLog } from '../../../../../components/application-logger'

export default ({ results, id, title, field, boost, contexts, defaultExpanded = false }) => {
  const ref = useRef(null)
  const { global } = useContext(searchContext)
  const {
    temporalRange: { from, to },
  } = global

  const [collapsed, setCollapsed] = useState(defaultExpanded === true ? false : !(from || to))

  return (
    <RegisterEventLog
      event="searchFilter"
      target={ref.current}
      handle={e => {
        e.stopPropagation()
        console.gql(makeLog('searchFilter', { ...e.detail }))
      }}
    >
      <Div sx={{ position: 'relative' }}>
        <FilterHeader title={title} collapsed={collapsed} setCollapsed={setCollapsed} />
        <Collapse
          timeout="auto"
          sx={{ width: '100%' }}
          unmountOnExit={false}
          key={`result-list-collapse-${id}`}
          in={!collapsed}
        >
          <FilterContent
            ref={ref}
            filterId={id}
            field={field}
            boost={boost}
            contexts={contexts}
            results={results}
          />
        </Collapse>
      </Div>
    </RegisterEventLog>
  )
}
