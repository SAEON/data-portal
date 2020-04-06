import { useState, useEffect } from 'react'
import { Catalogue } from '../../src'
import PropTypes from 'prop-types'

const defaultState = {
  loading: true,
  error: null,
  data: null,
}

const createHook = ({ catalog }) => (query) => {
  const [state, setState] = useState(defaultState)

  const fetchData = async (abortFetch) => {
    try {
      const result = await catalog.query(query, abortFetch)
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
  }, [JSON.stringify(query)])

  return { loading: state.loading, error: state.error, data: state.data }
}

let catalog
export const ReactCatalogue = ({ dslAddress, index, children } = {}) => {
  if (!catalog) catalog = new Catalogue({ dslAddress, index })
  return children(createHook({ catalog }))
}

ReactCatalogue.propTypes = {
  dslAddress: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}
