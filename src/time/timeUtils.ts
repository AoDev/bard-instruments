const ONE_MINUTE = 60000
const ONE_HOUR = 3600000
const ONE_DAY = 86400000

const timeUnits: {
  [key in 's' | 'second' | 'm' | 'minute' | 'h' | 'hour' | 'd' | 'day' | 'w' | 'week']: number
} = {
  s: 1000,
  second: 1000,
  m: 60000,
  minute: 60000,
  h: 3600000,
  hour: 3600000,
  d: 86400000,
  day: 86400000,
  w: 604800000,
  week: 604800000,
}

interface timeDistance {
  hours: number
  minutes: number
  seconds: number
}

/**
 * Returns number of hours, minutes, seconds between two timestamps
 * @param {Number} fromTime timestamp (in ms)
 * @param {Number} toTime timestamp (in ms)
 * @returns {timeDistance}
 */
function timeBetween(fromTime: number, toTime: number): timeDistance {
  let _fromTime = fromTime
  let _toTime = toTime
  if (fromTime < toTime) {
    _fromTime = toTime
    _toTime = fromTime
  }
  const inSeconds = Math.floor((_fromTime - _toTime) / 1000)
  return {
    hours: Math.floor(inSeconds / 3600),
    minutes: Math.floor((inSeconds % 3600) / 60),
    seconds: Math.floor((inSeconds % 3600) % 60),
  }
}

/**
 * @param {number} timestampInMs
 * @returns {number}
 */
function roundToNearestSecond(timestampInMs: number): number {
  return Math.round(timestampInMs / 1000) * 1000
}

/**
 * Same as Date.now(), but rounded to entire second.
 * @returns {number}
 */
function nowRounded(): number {
  return roundToNearestSecond(Date.now())
}

/**
 * @param {number} timestamp
 * @param {number} intervalInMs
 */
function roundTimeToInterval(timestamp: number, intervalInMs: number): number {
  return timestamp - (timestamp % intervalInMs)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval1s(timestamp: number): number {
  return timestamp - (timestamp % 1000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval5s(timestamp: number): number {
  return timestamp - (timestamp % 5000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval10s(timestamp: number): number {
  return timestamp - (timestamp % 10000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval30s(timestamp: number): number {
  return timestamp - (timestamp % 30000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval1m(timestamp: number): number {
  return timestamp - (timestamp % 60000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval5m(timestamp: number): number {
  return timestamp - (timestamp % 300000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval15m(timestamp: number): number {
  return timestamp - (timestamp % 900000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval1h(timestamp: number): number {
  return timestamp - (timestamp % ONE_HOUR)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval4h(timestamp: number): number {
  return timestamp - (timestamp % 14400000)
}

/**
 * @param {number} timestamp
 * @returns {number}
 */
function roundToInterval1d(timestamp: number): number {
  return timestamp - (timestamp % ONE_DAY)
}

/**
 * @returns {number} next hour timestamp
 */
function nextHourTimestamp(): number {
  return roundToInterval1h(Date.now() + ONE_HOUR)
}

// indexed helper
const roundToInterval = {
  '1s': roundToInterval1s,
  '5s': roundToInterval5s,
  '10s': roundToInterval10s,
  '30s': roundToInterval30s,
  '1m': roundToInterval1m,
  '5m': roundToInterval5m,
  '15m': roundToInterval15m,
  '1h': roundToInterval1h,
  '4h': roundToInterval4h,
  '1d': roundToInterval1d,
}

export default {
  ONE_MINUTE,
  ONE_HOUR,
  ONE_DAY,
  timeBetween,
  roundToNearestSecond,
  nextHourTimestamp,
  nowRounded,
  roundToInterval1s,
  roundToInterval5s,
  roundToInterval10s,
  roundToInterval30s,
  roundToInterval1m,
  roundToInterval5m,
  roundToInterval15m,
  roundToInterval1h,
  roundToInterval4h,
  roundToInterval1d,
  roundToInterval,
  roundTimeToInterval,
  timeUnits,
}
