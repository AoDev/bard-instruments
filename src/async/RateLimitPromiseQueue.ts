/**
 * Promise queue that enforces an amount of time that must have passed between each task.
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
class RateLimitPromiseQueue {
  [k: string]: any
  currentJob: () => any
  jobs: (() => Promise<any>)[]
  lastJobFinishedAt: number
  minTimeBetweenTasks: number

  /**
   * @param {() => Promise} task function that returns a promise
   * @returns {Promise}
   */
  add (task: (...args: any) => Promise<any>): Promise<any> {
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
  _finishJob () {
    this.lastJobFinishedAt = Date.now()
    this.currentJob = null
    this._next()
  }

  /**
   * Run or schedule next job, waiting for minTimeBetweenTasks if necessary.
   */
  _next () {
    if (this.jobs.length > 0) {
      const remainingTime = this.minTimeBetweenTasks - (Date.now() - this.lastJobFinishedAt)
      this.currentJob = this.jobs.shift()
      setTimeout(this.currentJob, remainingTime > 0 ? remainingTime : 0)
    }
  }

  /**
   * @param {Object} options
   * @param {Number} options.minTimeBetweenTasks Minimum time that must pass between tasks.
   */
  constructor (options: {minTimeBetweenTasks?: number} = {}) {
    /**
     * @type {Array.<() => Promise>}
     */
    this.jobs = []
    this.currentJob = null
    this.minTimeBetweenTasks = options.minTimeBetweenTasks || 0
    this.lastJobFinishedAt = Date.now() - options.minTimeBetweenTasks
    this._finishJob = this._finishJob.bind(this)
  }
}

export default RateLimitPromiseQueue
