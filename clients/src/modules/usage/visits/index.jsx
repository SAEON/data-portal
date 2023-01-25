import { createPortal } from 'react-dom'
import Provider from './context'
import Layout from './layout'
import Download from './download'

export default ({ headerRef }) => {
  return (
    <Provider>
      {createPortal(<Download />, headerRef.current)}
      <Layout />
    </Provider>
  )
}
