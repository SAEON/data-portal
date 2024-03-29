import '../src/lib/native-extensions.js'
import { buildCli, describe } from '@saeon/cli-tools'
import require from './lib/require.js'

const importFrom = require(import.meta)

const cli = args =>
  buildCli(
    describe(
      {
        integrations: importFrom('./modules/integrations/index.js'),
        mongo: importFrom('./modules/mongo/index.js'),
        sitemaps: importFrom('./modules/sitemaps/index.js'),
      },
      {
        title: 'sdp',
        description: 'SAEON Data Portal service management',
      }
    ),
    args
  )

cli(process.argv.slice(2))
