import '../src/lib/native-extensions.js'
import { buildCli, describe } from '../../packages/cli-tools/src/index.js'
import require from './lib/require.js'

const importFrom = require(import.meta)

export default args =>
  buildCli(
    describe(
      {
        integrations: importFrom('./modules/integrations/index.js'),
      },
      {
        title: 'sdp',
        description: 'SAEON Data Portal repository management',
      }
    ),
    args
  )
