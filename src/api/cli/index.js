import { buildCli, describe } from '../../packages/cli-tools/src/index.js'
import require from './lib/require.js'

const importFrom = require(import.meta)

export default args =>
  buildCli(
    describe(
      {
        dependencies: importFrom('./cli-modules/dependencies.js'),
        api: describe(
          {
            connections: () => console.log('hi'), // TODO - this POC should work
          },
          { title: 'sdp :: api :: connections', description: 'Check current API connections' }
        ),
      },
      {
        title: 'sdp',
        description: 'SAEON Data Portal repository management',
      }
    ),
    args
  )
