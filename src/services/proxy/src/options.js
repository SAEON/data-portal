import rule from './rules/index.js'
import {
  CATALOGUE_PROXY_PORT,
  CATALOGUE_PROXY_ENABLE_WEB_INTERFACE,
  CATALOGUE_PROXY_WEB_INTERFACE_PORT,
  CATALOGUE_PROXY_THROTTLE,
} from './config.js'

export default {
  port: CATALOGUE_PROXY_PORT,
  rule,
  webInterface: {
    enable: CATALOGUE_PROXY_ENABLE_WEB_INTERFACE,
    webPort: CATALOGUE_PROXY_WEB_INTERFACE_PORT,
  },
  throttle: CATALOGUE_PROXY_THROTTLE,
  forceProxyHttps: false,
  wsIntercept: false,
  silent: false,
}
