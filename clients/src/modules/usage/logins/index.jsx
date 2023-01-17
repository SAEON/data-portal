import { createPortal } from 'react-dom'
import Provider from './context'
import Table from './table'
import Download from './download'

export default ({ headerRef }) => {
  return (
    <Provider>
      {createPortal(<Download />, headerRef.current)}
      <Table />
    </Provider>
  )
}
