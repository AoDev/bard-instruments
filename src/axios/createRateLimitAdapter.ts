import RateLimitPromiseQueue from '../async/RateLimitPromiseQueue'

/**
 * Add rate limit management on an axios instance.
 *
 * Example:
 ```
  const _axios = require('axios')
  const axios = _axios.create({
    baseURL,
    adapter: createRateLimitAdapter(_axios.defaults.adapter, {minTimeBetweenRequests: 5000})
  })
```
 * @param adapter axios.defaults.adapter
 * @param options {minTimeBetweenRequests: 5000}
 */
export default function createRateLimitAdapter(
  adapter: any,
  options: {minTimeBetweenRequests?: number}
) {
  const minTimeBetweenTasks = options.minTimeBetweenRequests || 0
  const requestQueue = new RateLimitPromiseQueue({minTimeBetweenTasks})

  return function (config: any) {
    return requestQueue.add(() => adapter(config))
  }
}
