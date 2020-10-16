import { RegisterEventLog } from '..'
import { LATEST_COMMIT } from '../../config'
import packageJson from '../../../package.json'
import { debounce } from '../../lib/fns'

function simplifyTarget(target) {
  const { id, height, width, tagName } = target
  var simpleTarget = { tagName, id, class: target.getAttribute('class'), height, width }
  return simpleTarget
}

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
          target: simplifyTarget(target),
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
