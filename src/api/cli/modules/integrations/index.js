import { withFlags, describe } from '../../../../packages/cli-tools/src/index.js'
import saeonOdp from './saeon-odp/index.js'

export default describe(
  {
    saeon: withFlags(
      saeonOdp,
      {
        run: Boolean,
        r: 'run',
      },
      {
        title: 'sdp :: integrations :: SAEON ODP',
        describe: 'SAEON ODP integration',
      }
    ),
  },
  {
    title: 'sdp :: integrations',
    description: 'SDP integrations CLI',
  }
)
