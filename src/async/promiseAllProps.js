import _zipObject from 'lodash/zipObject'
import _keys from 'lodash/keys'
import _values from 'lodash/values'

/**
 * Use this function if you need to resolve your async operations as a map of promises and
 * get a rejection as soon as one of them fails.
 * @typedef {Object.<string, Promise>} PromiseMap
 * @param {PromiseMap} object - {'one': Promise1, 'two': Promise2}
 * @returns {Promise<PromiseMap>} - {'one': ResolvedPromise1, 'two': ResolvedPromise2}
 */
async function promiseAllProps (object) {
  return _zipObject(_keys(object), await Promise.all(_values(object)))
}

export default promiseAllProps
