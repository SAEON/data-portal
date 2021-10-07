import { useRef } from 'react'
import Header from './header'
import Table from './table'
import SubmissionsProvider from './context'

export default () => {
  const ref = useRef(document.getElementById('size-content'))

  return (
    <SubmissionsProvider>
      <div style={{ position: 'relative', height: ref.current.offsetHeight }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Header />
          <Table />
        </div>
      </div>
    </SubmissionsProvider>
  )
}
