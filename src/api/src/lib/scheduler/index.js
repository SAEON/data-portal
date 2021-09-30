import { CronJob } from 'cron'
import { performance } from 'perf_hooks'

function compose(cb) {
  return async function () {
    const now = performance.now()
    console.info('Starting job', this.name)
    try {
      await cb.call(this)
    } catch (error) {
      console.error('Error running scheduled task', error, this)
    }
    const then = performance.now()
    console.info(
      'Job complete',
      this.name,
      'Run time:',
      `${((then - now) / 1000).toFixed(2)} seconds`
    )
  }
}

export default class {
  constructor({ schedule, name = 'UNNAMED', onComplete = null }, cb) {
    this.name = name
    this.job = new CronJob(schedule, compose(cb).bind(this), onComplete, true)
  }

  start() {
    this.job.start()
  }

  stop() {
    this.job.stop()
  }
}
