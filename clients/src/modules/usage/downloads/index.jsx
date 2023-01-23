import { createPortal } from 'react-dom'
import Provider from './context'
import Layout from './layout'
import Download from './download'

export default ({ headerRef }) => (
  <Provider>
    {createPortal(<Download />, headerRef.current)}
    <Layout headerRef={headerRef} />
  </Provider>
)
