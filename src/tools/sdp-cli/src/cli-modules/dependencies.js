import { withFlags, describe } from '../../../../packages/cli-tools/src/index.js'

const dependencies = async ({ checkUpdates, update }) => {
  await new Promise(res => setTimeout(res, 1000))
  return {
    checkUpdates,
    update,
  }
}

export default describe(
  withFlags(dependencies, {
    checkUpdates: Boolean,
    update: Boolean,
    c: 'checkUpdates',
    u: 'update',
  }),
  {
    title: 'sdp :: dependencies',
    description: 'Manage SAEON Data Portal project dependencies',
  }
)
