import { withFlags, describe } from '@saeon/cli-tools'
import runCommand from './_run.js'

const run = async (args = {}) => {
  let { run, help, collection } = args
  if (!run || !collection) help = true

  if (run && collection) {
    return await runCommand(collection)
  }

  if (help) {
    console.info(
      'Help -- NOT IMPLEMENTED (but you probably want to specify the "run" flag (-r or --run) and specify a collection (-c or --collection)'
    )
    return
  }

  console.error('Unknown / unspecified option', args)
}

export default describe(
  withFlags(run, {
    help: Boolean,
    run: Boolean,
    collection: String,
    h: 'help',
    r: 'run',
    c: 'collection'
  }),
  {
    title: 'sdp :: mongo :: ID to timestamp',
    description: 'Update collection docs with a createdAt field, using the _id field',
  }
)
