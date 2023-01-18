import { describe } from '@saeon/cli-tools'
import require from '../../lib/require.js'

const importFrom = require(import.meta)

export default describe(
  {
    idToTimestamp: importFrom('./id-to-timestamp/index.js'),
    updateLogLocations: importFrom('./update-log-locations/index.js'),
    updateValidation: importFrom('./update-validation-rules/index.js'),
  },
  {
    title: 'sdp :: mongo',
    describe: 'MongoDB commands',
  }
)
