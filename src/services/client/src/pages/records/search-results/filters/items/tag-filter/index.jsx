import { useState, useContext, useMemo } from 'react'
import Collapse from '@material-ui/core/Collapse'
import { context as globalContext } from '../../../../../../contexts/global'
import FilterHeader from './_header'
import FilterContent from './_content'

export default ({
  results,
  title,
  field,
  boost,
  sortBy = 'key',
  sortOrder = 'asc',
  style = {},
}) => {
  const { global } = useContext(globalContext)
  const { terms } = global

  const { filteredResults, currentContext } = useMemo(() => {
    const termValues = terms?.map(({ value }) => value) || []

    const currentContext = []
    const filteredResults = results?.length
      ? [...results].filter(({ key, doc_count }) => {
          if (termValues.includes(key.toString())) {
            currentContext.push({ key, doc_count })
            return false
          }
          return true
        })
      : undefined

    return {
      filteredResults,
      currentContext,
    }
  }, [results, terms])

  const [collapsed, setCollapsed] = useState(!currentContext.length)

  return (
    <>
      <FilterHeader title={title} style={style} collapsed={collapsed} setCollapsed={setCollapsed} />
      <Collapse style={{ width: '100%' }} key="result-list-collapse" unmountOnExit in={!collapsed}>
        <FilterContent
          terms={terms}
          field={field}
          boost={boost}
          sortBy={sortBy}
          sortOrder={sortOrder}
          filteredResults={filteredResults}
          currentContext={currentContext}
        />
      </Collapse>
    </>
  )
}
