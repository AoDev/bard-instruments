import timeUtils from './timeUtils'
const {roundTimeToInterval, timeUnits} = timeUtils

type timeUnit = 's' | 'second' | 'm' | 'minute' | 'h' | 'hour' | 'd' | 'day' | 'w' | 'week'

export default class Scheduler {
  timer: NodeJS.Timeout
  timeUnit: timeUnit = 's'
  timeValue = 4
  startAt = 0

  start(task: () => Promise<any>) {
    const period = this.timeValue * timeUnits[this.timeUnit]
    const currentXh = roundTimeToInterval(Date.now(), period)
    const nextXh = currentXh + period
    const delay = nextXh - Date.now()
    const run = () => {
      this.timer = setTimeout(run, period)
      task()
    }
    this.timer = setTimeout(run, delay)
  }

  stop() {
    clearTimeout(this.timer)
  }

  constructor(config: {timeValue: number; timeUnit: timeUnit}) {
    Object.assign(this, config)
  }
}
