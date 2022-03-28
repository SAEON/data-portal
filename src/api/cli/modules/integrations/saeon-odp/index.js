import { withFlags, describe } from '../../../../../packages/cli-tools/src/index.js'
import runOdpIntegration from './_run.js'

const run = async ({ run }) => {
  if (run) {
    return await runOdpIntegration()
  }

  return 'Unknown / unspecified option"'
}

export default describe(
  withFlags(run, {
    run: Boolean,
  }),
  {
    title: 'sdp :: integrations :: odp',
    description: 'SDP integrations CLI',
  }
)
