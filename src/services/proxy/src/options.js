import rule from './rules'
import { PORT, ENABLE_WEB_INTERFACE, WEB_INTERFACE_PORT, THROTTLE } from './config'

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