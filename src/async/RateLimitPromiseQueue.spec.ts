import RateLimitPromiseQueue from './RateLimitPromiseQueue'
import sleep from './sleep'

describe('RateLimitPromiseQueue', () => {
  describe('instance', () => {
    it('should set minTimeBetweenTasks option', () => {
      const queue = new RateLimitPromiseQueue({minTimeBetweenTasks: 1000})
      expect(queue.minTimeBetweenTasks).toBe(1000)
    })
  })

  describe('add (task)', () => {
    describe('when there is a running job', () => {
      it('return a promise and queue the task (not run the new task)', async () => {
        const queue = new RateLimitPromiseQueue({minTimeBetweenTasks: 1000})
        queue.currentJob = () => Promise.resolve(true)
        const spyTask = jest.fn().mockImplementation(() => Promise.resolve(true))
        const taskPromise = queue.add(spyTask)
        expect(queue.jobs.length).toBe(1)
        expect(taskPromise).toBeInstanceOf(Promise)
        await sleep(1000)
        expect(spyTask).not.toHaveBeenCalled()
      })
    })

    describe('when there is not a running job', () => {
      it('should return a promise and run the new task inmediately', async () => {
        const queue = new RateLimitPromiseQueue({minTimeBetweenTasks: 1000})
        const expectedTaskResult = 'some result'
        const spyTask = jest.fn().mockImplementation(async () => {
          await sleep(200)
          return expectedTaskResult
        })
        const taskPromise = queue.add(spyTask)
        expect(queue.jobs.length).toBe(0)
        expect(taskPromise).toBeInstanceOf(Promise)
        const result = await taskPromise
        expect(spyTask).toHaveBeenCalled()
        expect(result).toBe(expectedTaskResult)
      })
    })
  })

  describe('rate limit', () => {
    test('the queue should respect minTimeBetweenTasks milliseconds between tasks', async () => {
      const minTimeBetweenTasks = 500
      const queue = new RateLimitPromiseQueue({minTimeBetweenTasks})
      const startTime = Date.now()
      const tasks = [1, 2, 3, 4].map((item) => queue.add(() => Promise.resolve(`task${item}`)))
      const result = await Promise.all(tasks)
      expect(result).toEqual(['task1', 'task2', 'task3', 'task4'])
      const totalTime = Date.now() - startTime
      expect(totalTime).toBeGreaterThanOrEqual((tasks.length - 1) * minTimeBetweenTasks)
    })
  })
})
