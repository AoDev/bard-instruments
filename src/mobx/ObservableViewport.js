import throttle from 'lodash/throttle'
import * as mobx from 'mobx'
const {observable, action} = mobx

/**
 * Expose observable properties of the browser viewport.
 *
 * ### Usage:
 ```
 const viewport = new ObservableViewport
 mobx.autorun(() => console.log(viewport.size))
 ```
 *
 * ### Purpose example: responsive and progressive feature enhancement
 * Create a global UIStore and instantiate the observable viewport.
 * Now you can easily implement responsive / progressive features in your UI components.
 */
class ObservableViewport {
  static getViewPortSize () {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    }
  }

  size = ObservableViewport.getViewPortSize()

  updateViewportSize () {
    this.size = ObservableViewport.getViewPortSize()
  }

  destroy () {
    window.removeEventListener('resize', this.throttledUpdateViewportSize)
  }

  constructor () {
    // Track viewport dimensions
    this.throttledUpdateViewportSize = throttle(this.updateViewportSize, 250, {
      leading: false,
    })
    window.addEventListener('resize', this.throttledUpdateViewportSize, {
      passive: true,
    })
  }
}

export default mobx.decorate(ObservableViewport, {
  size: observable.ref,
  updateViewportSize: action.bound,
})
