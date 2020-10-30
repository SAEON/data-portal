import RegisterEventLog from '../application-logger/_register-event-log'
import { LATEST_COMMIT } from '../../config'
import packageJson from '../../../package.json'
import { debounce } from '../../lib/fns'

export default ({ children }) => (
  <RegisterEventLog
    event={'click'}
    handle={async ({ type, target, x, y }) =>
      console.gql({
        clientVersion: packageJson.version,
        type,
        commitHash: LATEST_COMMIT,
        createdAt: new Date(),
        info: {
          x,
          y,
          target: target.outerHTML,
        },
      })
    }
  >
    <RegisterEventLog
      event={'mousemove'}
      handle={debounce(async ({ type, x, y }) =>
        console.gql({
          clientVersion: packageJson.version,
          type,
          commitHash: LATEST_COMMIT,
          createdAt: new Date(),
          info: {
            x,
            y,
          },
        })
      )}
    >
      {children}
    </RegisterEventLog>
  </RegisterEventLog>
)
