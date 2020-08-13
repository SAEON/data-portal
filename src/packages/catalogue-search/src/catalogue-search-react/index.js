import { useState, useEffect } from 'react'
import { Catalogue } from '../catalogue-search/index.js'
import PropTypes from 'prop-types'

const defaultState = {
  loading: true,
  error: null,
  data: null,
}

const createHook = ({ catalog }) => () => {
  const query = catalog.getQuery()
  const queryJson = JSON.stringify(query)
  const [state, setState] = useState(defaultState)

  const fetchData = async abortFetch => {
    try {
      const result = await catalog.query(null, abortFetch)
      if (result)
        setState({
          loading: false,
          error: null,
          data: result,
        })
    } catch (error) {
      setState({
        loading: false,
        error: error,
        data: null,
      })
    }
  }

  useEffect(() => {
    setState(defaultState)
    const abortFetch = new AbortController()
    fetchData(abortFetch)
    return () => abortFetch.abort()
  }, [queryJson])

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
  }
}

let catalog
export const ReactCatalogue = ({
  currentPage = 0,
  pageSize = 10,
  dslAddress,
  index,
  source,
  matchClauses,
  clauses,
  filter,
  children,
} = {}) => {
  if (!catalog) catalog = new Catalogue({ dslAddress, index, pageSize })
  if (catalog._currentPage !== currentPage) catalog._currentPage = currentPage

  if (source) catalog.defineSource(source)
  if (matchClauses) catalog.addMatchClauses(matchClauses)
  if (clauses) catalog.addClauses(...clauses)
  if (filter) catalog.setFilter(filter)

  return children(createHook({ catalog }), catalog)
}

ReactCatalogue.propTypes = {
  dslAddress: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}
