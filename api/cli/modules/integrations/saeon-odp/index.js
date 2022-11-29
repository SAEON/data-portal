import { withFlags, describe } from '@saeon/cli-tools'
import runIntegration from './_run.js'

const run = async (args = {}) => {
  let { run, help, rebuild = false, delete: deleteSelected = '' } = args

  deleteSelected = deleteSelected.split(',').map(s => s.trim()).filter(_ => _)

  if (run || deleteSelected.length) {
    help = false
  } else {
    help = true
  }

  if (run) {
    return await runIntegration({ rebuild })
  }

  if (deleteSelected.length) {
    return await runIntegration({ skipInsert: true, deleteSelected })
  }

  if (help) {
    console.info(
      'Help -- NOT IMPLEMENTED (but you probably want to specify the "run" flag (-r or --run)'
    )
    return
  }

  console.error('Unknown / unspecified option', args)
}

export default describe(
  withFlags(run, {
    help: Boolean,
    run: Boolean,
    rebuild: Boolean,
    delete: String,
    h: 'help',
    r: 'run',
    d: 'delete',
  }),
  {
    title: 'sdp :: integrations :: SAEON odp',
    description: 'Index SAEON ODP records for searching in the catalogue',
  }
)
