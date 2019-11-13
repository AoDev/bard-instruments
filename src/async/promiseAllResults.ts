/**
 * Use this function if you want the results of your async operations as an array of promises,
 * regardless of failure or success.
 * It always resolves. Failed promises errors will be caught and assigned as value.
 * @param {[Promise]} promises
 * @returns {Promise<[any]>} - [ResolvedPromise1, RejectedPromise2]
 */
function promiseAllResults (promises: Promise<any>[]) {
  return Promise.all(promises.map((promise) => promise.catch((err) => err)))
}

export default promiseAllResults
