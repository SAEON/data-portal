import rule from './rules/index.js'
import { PORT, ENABLE_WEB_INTERFACE, WEB_INTERFACE_PORT, THROTTLE } from './config.js'

export default {
  port: PORT,
  rule,
  webInterface: {
    enable: ENABLE_WEB_INTERFACE,
    webPort: WEB_INTERFACE_PORT,
  },
  throttle: THROTTLE,
  forceProxyHttps: false,
  wsIntercept: false,
  silent: false,
}
