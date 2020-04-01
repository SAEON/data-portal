import { useState, useEffect } from 'react'
import { Catalogue } from '../../src'
import PropTypes from 'prop-types'

const createHook = ({ catalog }) => (query) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  const fetchData = async (abortFetch) => {
    try {
      const result = await catalog.query(query, abortFetch)
      setData(result)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const abortFetch = new AbortController()
    setData(null)
    setLoading(true)
    setError(false)
    fetchData(abortFetch)
    return () => abortFetch.abort()
  }, [JSON.stringify(query)])

  return { loading, error, data }
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
