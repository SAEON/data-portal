import { withFlags, describe } from '@saeon/cli-tools'
import runCommand from './_run.js'

const run = async (args = {}) => {
  let { run, help, collection, field } = args

  let okay = false
  if (run && collection && field) {
    okay = true
  } else {
    help = true
  }

  if (help) {
    console.info(
      'Help -- NOT IMPLEMENTED (but you probably want to specify the "run" flag (-r or --run) and specify a collection (-c or --collection)'
    )
    return
  }

  if (okay) {
    return await runCommand({ field, collection })
  }

  console.error('Unknown / unspecified option', args)
}

export default describe(
  withFlags(run, {
    help: Boolean,
    run: Boolean,
    collection: String,
    field: String,
    h: 'help',
    r: 'run',
    c: 'collection',
    f: 'field',
  }),
  {
    title: 'sdp :: mongo :: delete field from collection',
    description: 'Remove field from all documents in a collection',
  }
)
