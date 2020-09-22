import timeUtils from './timeUtils'

const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND
const ONE_HOUR = 60 * ONE_MINUTE

describe('timeUtils', () => {
  describe('timeBetween()', () => {
    it('should return time in hours, minutes, seconds', () => {
      const now = Date.now()
      const result = timeUtils.timeBetween(now, now + (4 * ONE_SECOND) + (10 * ONE_MINUTE) + (1 * ONE_HOUR))
      expect(result).toEqual({hours: 1, minutes: 10, seconds: 4})
    })

    it('should return time in hours, minutes, seconds', () => {
      const now = Date.now()
      const result = timeUtils.timeBetween(now + (4 * ONE_SECOND) + (10 * ONE_MINUTE) + (1 * ONE_HOUR), now)
      expect(result).toEqual({hours: 1, minutes: 10, seconds: 4})
    })

    it('should work with 0', () => {
      const result = timeUtils.timeBetween(0, 0)
      expect(result).toEqual({hours: 0, minutes: 0, seconds: 0})
    })
  })

  describe('roundToNearestSecond()', () => {
    it('should round to nearest second', () => {
      expect(timeUtils.roundToNearestSecond(1568840444505)).toBe(1568840445000)
      expect(timeUtils.roundToNearestSecond(1568840444405)).toBe(1568840444000)
    })
  })

  describe('roundToIntervalxx', () => {
    it('should determine the right interval', () => {
      expect(timeUtils.roundToInterval1s(1568840444505)).toBe(1568840444000)
      expect(timeUtils.roundToInterval5s(1568840444505)).toBe(1568840440000)
      expect(timeUtils.roundToInterval10s(1568840441000)).toBe(1568840440000)
      expect(timeUtils.roundToInterval30s(1568840441234)).toBe(1568840430000)

      // = Wednesday, 18 September 2019 21:00:44.999 UTC
      expect(timeUtils.roundToInterval1m(1568840444999)).toBe(1568840400000)
      expect(timeUtils.roundToInterval5m(1568840444999)).toBe(1568840400000)
      expect(timeUtils.roundToInterval15m(1568840444999)).toBe(1568840400000)

      // = Wednesday, 18 September 2019 21:37:59 UTC
      expect(timeUtils.roundToInterval1h(1568842679000)).toBe(1568840400000)
      expect(timeUtils.roundToInterval4h(1568842679000)).toBe(1568836800000)
      expect(timeUtils.roundToInterval1d(1568842679000)).toBe(1568764800000)

      // Checking that indexed export is there too.
      expect(timeUtils.roundToInterval['1s']).toBe(timeUtils.roundToInterval1s)
      expect(timeUtils.roundToInterval['5s']).toBe(timeUtils.roundToInterval5s)
      expect(timeUtils.roundToInterval['10s']).toBe(timeUtils.roundToInterval10s)
      expect(timeUtils.roundToInterval['30s']).toBe(timeUtils.roundToInterval30s)
      expect(timeUtils.roundToInterval['1m']).toBe(timeUtils.roundToInterval1m)
      expect(timeUtils.roundToInterval['5m']).toBe(timeUtils.roundToInterval5m)
      expect(timeUtils.roundToInterval['15m']).toBe(timeUtils.roundToInterval15m)
      expect(timeUtils.roundToInterval['1h']).toBe(timeUtils.roundToInterval1h)
      expect(timeUtils.roundToInterval['4h']).toBe(timeUtils.roundToInterval4h)
      expect(timeUtils.roundToInterval['1d']).toBe(timeUtils.roundToInterval1d)
    })
  })
})
