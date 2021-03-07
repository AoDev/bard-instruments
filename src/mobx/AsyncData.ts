import * as mobx from 'mobx'

type AsyncDataProp = 'pending' | 'value' | 'lastUpdated' | 'error' | 'fetchHandler'

/**
 * Observable model of typical asynchronous data state
 *
 * Observable properties: `pending`,`data`, `lastUpdated`, `error`
 *
 * ### Usage example
 * Provide your model to a view, like a React component and manage the model in a store.
 *
 ```
 // NewsStore.js (pseudo code)
 import myNewsApi from 'myNewsApi'

 class NewsStore {
   news = new AsyncData({
     data: [],
     fetchHandler: () => myNewsApi.fetchNews()
   })
 }

 // React component (pseudo code)
 function NewsComponent (props) {
   const {news} = props
   return (
     <div>
       <button onclick={news.fetch}>Update news</button>
       {news.pending && <p>Loading...</p>}
       {news.error && <p>Error</p>}
       {news.data.map((item) => <h3>{item.title}</h3>)}
     </div>
   )
 }
 ```
 */
export default class AsyncData<T> {
  pending = false
  value: T = null
  lastUpdated = 0
  lastAttempt = 0
  error: Error = null
  fetchHandler: (...args: any) => Promise<T>

  /**
   * Helper to set values through mobx actions.
   */
  public set(prop: AsyncDataProp, value: any) {
    ;(this[prop] as any) = value
  }

  /**
   * Helper to assign multiple props values through a mobx action.
   */
  public assign(props: {[key: string]: any}) {
    Object.assign(this, props)
  }

  /**
   * Update async data
   */
  async fetch(...args: any) {
    const now = Date.now()
    this.assign({pending: true, error: null})
    try {
      const value = await this.fetchHandler(...args)
      this.assign({value, lastUpdated: now})
      return value
    } catch (error) {
      this.set('error', error)
    } finally {
      this.assign({pending: false, lastAttempt: now})
    }
  }

  /**
   * @param {{value?: *, fetchHandler: () => Promise<any>}} options
   */
  constructor(options: {value?: T; fetchHandler: (...args: any) => Promise<T>}) {
    this.fetchHandler = options.fetchHandler
    this.value = options.value
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
