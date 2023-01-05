import packageJson from '../../../package.json'
import getUriState from '../../lib/fns/get-uri-state'

const { referrer } = getUriState()

export default (type, info = {}) => {
  if (!type) {
    throw new Error('No log type specified makeLog(...)')
  }

  return {
    clientVersion: packageJson.version,
    type,
    referrer,
    createdAt: new Date(),
    info: {
      pathname: window.location.pathname,
      ...info,
    },
  }
}
