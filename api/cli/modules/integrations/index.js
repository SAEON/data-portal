import { describe } from '@saeon/cli-tools'
import require from '../../lib/require.js'

const importFrom = require(import.meta)

export default describe(
  {
    saeon: importFrom('./saeon-odp/index.js'),
    sitemaps: importFrom('./sitemaps/index.js'),
  },
  {
    title: 'sdp :: integrations',
    describe: 'SAEON Data Portal integration tooling',
  }
)
