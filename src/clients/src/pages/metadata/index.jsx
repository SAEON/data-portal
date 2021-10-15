import { useRef } from 'react'
import Header from './header'
import Table from './table'
import MetadataProvider from './context'

export default () => {
  /**
   * #side-content is defined in src/contexts/layout/index.jsx
   * This div is never be re-rendered while on this page
   */
  const ref = useRef(document.getElementById('size-content'))

  return (
    <MetadataProvider>
      <div style={{ position: 'relative', height: ref.current.offsetHeight }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Header />
          <Table />
        </div>
      </div>
    </MetadataProvider>
  )
}
