export const ONE_MINUTE = 60 * 1000
export const ONE_HOUR = 60 * ONE_MINUTE

/**
 * Returns number of hours, minutes, seconds between two timestamps
 * @param {Number} fromTime timestamp (in ms)
 * @param {Number} toTime timestamp (in ms)
 * @returns {{hours: number, minutes: number, seconds: number}}
 */
export function timeBetween (fromTime: number, toTime: number) {
  let _fromTime = fromTime
  let _toTime = toTime
  if (fromTime < toTime) {
    _fromTime = toTime
    _toTime = fromTime
  }
  const inSeconds = Math.floor((_fromTime - _toTime) / 1000)
  return {
    hours: Math.floor(inSeconds / 3600),
    minutes: Math.floor(inSeconds % 3600 / 60),
    seconds: Math.floor(inSeconds % 3600 % 60),
  }
}

/**
 * @param {number} timestampInMs
 */
export function roundToNearestSecond (timestampInMs: number) {
  return Math.round(timestampInMs / 1000) * 1000
}

/**
 * Same as Date.now(), but rounded to entire second.
 * @returns {number}
 */
export function nowRounded () {
  return roundToNearestSecond(Date.now())
}

/**
 * @returns {number} next hour timestamp
 */
export function nextHourTimestamp () {
  return roundToInterval1h(Date.now() + ONE_HOUR)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
export function roundToInterval1s (timestamp: number) {
  return timestamp - (timestamp % 1000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
export function roundToInterval5s (timestamp: number) {
  return timestamp - (timestamp % 5000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
export function roundToInterval10s (timestamp: number) {
  return timestamp - (timestamp % 10000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
export function roundToInterval30s (timestamp: number) {
  return timestamp - (timestamp % 30000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
export function roundToInterval1m (timestamp: number) {
  return timestamp - (timestamp % 60000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
export function roundToInterval1h (timestamp: number) {
  return timestamp - (timestamp % ONE_HOUR)
}

// indexed helper
const roundToInterval = {
  '1s': roundToInterval1s,
  '5s': roundToInterval5s,
  '10s': roundToInterval10s,
  '30s': roundToInterval30s,
  '1m': roundToInterval1m,
}

export default {
  ONE_MINUTE,
  ONE_HOUR,
  timeBetween,
  roundToNearestSecond,
  nextHourTimestamp,
  nowRounded,
  roundToInterval1s,
  roundToInterval5s,
  roundToInterval10s,
  roundToInterval30s,
  roundToInterval1m,
  roundToInterval,
}
