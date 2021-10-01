import { SERVER_TASKS } from '../../../../config/index.js'

export default async () =>
  SERVER_TASKS.tasks.map(task => {
    const { cronTime, running, lastExecution } = task.job
    return {
      ...task,
      job: { cronTime, running, lastExecution },
    }
  })
