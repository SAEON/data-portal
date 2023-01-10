import makeLog from './_make-log'
import RegisterEventLog from './_register-event-log'

export default ({ children }) => (
  <RegisterEventLog
    target={document}
    event="load"
    readyState="complete"
    handle={() => console.gql(makeLog('appRender'))}
  >
    {children}
  </RegisterEventLog>
)
