import { describe } from '@saeon/cli-tools'
import require from '../../lib/require.js'

const importFrom = require(import.meta)

export default describe(
  {
    updateValidation: importFrom('./update-validation-rules/index.js'),
    idToTimestamp: importFrom('./id-to-timestamp/index.js')
  },
  {
    title: 'sdp :: mongo',
    describe: 'MongoDB commands',
  }
)
