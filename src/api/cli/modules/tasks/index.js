import { withFlags, describe } from '../../../../packages/cli-tools/src/index.js'
import listTasks from './_list.js'

const tasks = async ({list}) => {
  await new Promise(res => setTimeout(res, 1000))

  if (list) {
    return listTasks()
  }
}

export default describe(
  withFlags(tasks, {
    list: Boolean,
    l: 'list'
  }),
  {
    title: 'sdp :: tasks',
    description: 'List scheduled tasks'
  }
)