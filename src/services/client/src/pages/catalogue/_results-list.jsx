import React from 'react'
import ResultItem from './_result-item'

export default ({ results }) => (
  <div style={{ marginRight: 16 }}>
    {results.map((item, i) => (
      <ResultItem key={i} doc={item.target} />
    ))}
  </div>
)
