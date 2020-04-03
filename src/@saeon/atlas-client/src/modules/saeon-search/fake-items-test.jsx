import React from 'react'
import { VirtualList } from '../../components'

const items = []

const generateJunkData = () => {
  for (var i = 0; i < 30; i++) {
    items.push(i)
  }
}

export default ({ height, width }) => {
  console.log('IN fake-items-test.jsx')
  generateJunkData()
  return (
    <VirtualList
      height={height}
      width={width}
      Template={(item) => {
        return (
          <div style={{ backgroundColor: 'lightblue' }}>
            <p>template content</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>

            <p>.</p>
            <p>.</p>
            <p>.</p>
          </div>
        )
      }}
      loadMoreItems={async () => {
        alert('TODO - this is being migrated to a Lucene-based search')
      }}
      items={items}
    />
  )
}
