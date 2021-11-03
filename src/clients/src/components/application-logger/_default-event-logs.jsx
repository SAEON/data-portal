import { useContext, useCallback } from 'react'
import RegisterEventLog from './register-event-log'
import packageJson from '../../../package.json'
import debounce from '../../lib/fns/debounce'
import useWindowSize from '../../hooks/use-window-size'
import { context as globalContext } from '../../contexts/global'

export default ({ children }) => {
  const { global } = useContext(globalContext)
  const { referrer } = global
  const [innerHeight, innerWidth] = useWindowSize()

  const makeLog = useCallback(
    ({ type, x, y }) => ({
      clientVersion: packageJson.version,
      type,
      referrer,
      createdAt: new Date(),
      info: {
        pathname: window.location.pathname,
        innerHeight,
        innerWidth,
        x,
        y,
      },
    }),
    [innerHeight, innerWidth, referrer]
  )

  return (
    <RegisterEventLog event={'click'} handle={e => console.gql(makeLog(e))}>
      <RegisterEventLog event={'mousemove'} handle={debounce(e => console.gql(makeLog(e)), 5)}>
        {children}
      </RegisterEventLog>
    </RegisterEventLog>
  )
}
