import { createPortal } from 'react-dom'
import Provider from './context'
import Table from './table'
import Download from './download'

export default ({ contentRef, headerRef }) => {
  return (
    <Provider>
      {createPortal(<Download />, headerRef.current)}
      <Table contentRef={contentRef} />
    </Provider>
  )
}
