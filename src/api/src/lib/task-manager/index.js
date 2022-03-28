import { CronJob } from 'cron'
import { performance } from 'perf_hooks'

function compose(cb) {
  return async function() {
    const now = performance.now()
    console.info(this.id, 'starting')
    try {
      await cb.call(this)
    } catch (error) {
      console.error('Error running scheduled task', error, this)
    }
    const then = performance.now()
    console.info(this.id, 'completed', 'Run time:', `${((then - now) / 1000).toFixed(2)} seconds`)
  }
}

export class Task {
  constructor({ schedule, id, onComplete = null }, cb) {
    if (!id) {
      throw new Error('Tasks must be created with an id')
    }

    this.id = id
    this.job = new CronJob(schedule, compose(cb).bind(this), onComplete, true)
  }

  start() {
    this.job.start()
  }

  stop() {
    this.job.stop()
  }
}

export default () => {
  const tasks = []

  return {
    tasks,
    addTask: task => {
      if (tasks.find(_task => _task.id === task.id)) {
        throw new Error(`Task with an ID "${task.id}" has already been added`)
      }
      tasks.push(task)
      console.info('Task added', task.id)
    },
    removeTask: id => {
      const index = tasks.findIndex(task => task.id === id)
      if (index >= 0) {
        tasks[index].stop()
        tasks.splice(index, 1)
        console.info('Task removed', id)
      }
    }
  }
}
