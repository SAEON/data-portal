import { createPortal } from 'react-dom'
import Provider from './context'
import Charts from './charts'
import Download from './download'

export default ({ headerRef }) => {
  return (
    <Provider>
      {createPortal(<Download />, headerRef.current)}
      <Charts />
    </Provider>
  )
}
