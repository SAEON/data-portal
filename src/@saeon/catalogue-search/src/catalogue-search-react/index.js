import { useState, useEffect } from 'react'
import { Catalogue } from '../../src'
import PropTypes from 'prop-types'

const useCatalogue = ({ catalog }) => (query) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function _() {
      try {
        const result = await catalog.query(query)
        setData(result)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    _()
  })

  return { loading, error, data }
}


let catalog
export const ReactCatalogue = ({ dslAddress, index, children } = {}) => {
  if (!catalog) catalog = new Catalogue({ dslAddress, index })
  return children(useCatalogue({ catalog }))
}

ReactCatalogue.propTypes = {
  dslAddress: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}