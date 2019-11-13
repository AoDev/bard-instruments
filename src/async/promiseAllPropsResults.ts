import _zipObject from 'lodash/zipObject'
import _keys from 'lodash/keys'
import _values from 'lodash/values'
import promiseAllResults from './promiseAllResults'

interface promiseMap {
  [key: string]: Promise<any>
}

/**
 * Use this function if you want the results of your async operations as a map of promises,
 * regardless of failure or success.
 * It always resolves. Failed promises errors will be caught and assigned as value.
 * @typedef {Object.<string, Promise>} PromiseMap
 * @param {PromiseMap} object - {'one': Promise1, 'two': Promise2}
 * @returns {Promise<PromiseMap>} - {'one': ResolvedPromise1, 'two': RejectedPromise2}
 */
async function promiseAllPropsResults (object: promiseMap) {
  return _zipObject(_keys(object), await promiseAllResults(_values(object)))
}

export default promiseAllPropsResults
