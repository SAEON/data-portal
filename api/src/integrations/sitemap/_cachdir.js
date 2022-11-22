import { join } from 'path'
import { homedir } from 'os'

const name = 'sdp-sitemaps-cache'

export default process.platform === 'darwin'
  ? join(homedir(), 'Library', 'Caches', name)
  : process.platform === 'win32'
  ? join(process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local'), name)
  : join(process.env.XDG_CACHE_HOME || join(homedir(), '.cache'), name)
