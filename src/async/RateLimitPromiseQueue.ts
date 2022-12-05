/**
 * Promise queue that enforces an amount of time that must have passed between each task.
 *
 * Typical use case: request rate limit to an API.
 *
 * ### Usage
 ```
 const queue = new RateLimitPromiseQueue({minTimeBetweenTasks: 2000})

 // means that, before running the next task,
 // 2 seconds must have passed after the last task has resolved.

 // queue.add returns a promise

 const results = await Promise.all([
   queue.add(() => Promise.resolve(1)),
   queue.add(() => Promise.resolve(2)),
   queue.add(() => Promise.resolve(3)),
 ])

 // results will resolve to [1, 2, 3] in no less than 4 seconds.
 // First task may be executed inmediately.
 // It depends on the queue state. (no current running job)
 ```
 */
export default class RateLimitPromiseQueue {
  currentJob: (() => any) | null = null
  jobs: (() => Promise<any>)[]
  lastJobFinishedAt: number
  minTimeBetweenTasks: number

  add<T>(task: (...args: any) => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.jobs.push(() => {
        return task().then(resolve, reject).finally(this._finishJob)
      })
      if (this.currentJob === null) {
        this._next()
      }
    })
  }

  /**
   * Prepare the queue for next job once job has finished.
   */
  _finishJob() {
    this.lastJobFinishedAt = Date.now()
    this.currentJob = null
    this._next()
  }

  /**
   * Run or schedule next job, waiting for minTimeBetweenTasks if necessary.
   */
  _next() {
    const job = this.jobs.shift()
    if (job) {
      const remainingTime = this.minTimeBetweenTasks - (Date.now() - this.lastJobFinishedAt)
      this.currentJob = job
      setTimeout(this.currentJob, remainingTime > 0 ? remainingTime : 0)
    }
  }

  constructor(options: {minTimeBetweenTasks: number}) {
    this.jobs = []
    this.minTimeBetweenTasks = options.minTimeBetweenTasks
    this.lastJobFinishedAt = Date.now() - options.minTimeBetweenTasks
    this._finishJob = this._finishJob.bind(this)
  }
}
