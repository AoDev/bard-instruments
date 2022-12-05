/**
 * Use this function if you need to resolve your async operations as a map of promises and
 * get a rejection as soon as one of them fails.
 * @returns {Promise<PromiseMap>} - {'one': ResolvedPromise1, 'two': ResolvedPromise2}
 */
async function promiseAllProps<T>(object: {[K in keyof T]: Promise<T[K]> | T[K]}): Promise<T> {
  const keys = Object.keys(object) as Array<keyof T>
  const promises = keys.map((key) => object[key])
  const results = await Promise.all(promises)
  return keys.reduce((acc, key, index) => {
    acc[key] = results[index]
    return acc
  }, {} as {[K in keyof T]: T[K]})
}

export default promiseAllProps
