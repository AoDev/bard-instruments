import * as mobx from 'mobx'

export interface IAsyncDataProps<T> {
  pending: boolean
  loaded: boolean
  value: T
  lastUpdated: number
  lastAttempt: number
  error: Error | null
}

/**
 * Observable model of typical asynchronous data state
 *
 * Observable properties: `pending`, `loaded`, `value`, `lastUpdated`, `lastAttempt` `error`
 *
 * ### Usage example
 * Provide your model to a view, like a React component and manage the model in a store.
 *
 ```
 // NewsStore.js (pseudo code)
 import myNewsApi from 'myNewsApi'

 class NewsStore {
   news = new AsyncData<INews[]>([], myNewsApi.fetchNews)
 }

 // React component (pseudo code)
 function NewsComponent ({news}: {news: INews}) {
   return (
     <div>
       <button onclick={news.fetch}>Update news</button>
       {news.pending && <p>Loading...</p>}
       {news.error && <p>Error</p>}
       {news.value.map((item) => <h3>{item.title}</h3>)}
     </div>
   )
 }
 ```
 */

export default class AsyncData<T> implements IAsyncDataProps<T> {
  pending = false
  loaded = false
  value: T
  lastUpdated = 0
  lastAttempt = 0
  error: Error | null = null
  private readonly initialValue: T
  private readonly fetchHandler: (...args: any) => Promise<T>
  private readonly onError: (err: Error) => void
  static defaultErrorHandler(error: Error) {
    console.error(error)
  }

  /**
   * Helper to set values through mobx actions.
   */
  public set(prop: keyof IAsyncDataProps<T>, value: any) {
    ;(this[prop] as any) = value
  }

  /**
   * Helper to assign multiple props values through a mobx action.
   */
  public assign(props: Partial<IAsyncDataProps<T>>) {
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
      this.onError?.(error)
      this.set('error', error)
    } finally {
      this.assign({pending: false, lastAttempt: now})
      this.set('loaded', true)
    }
  }

  /**
   * Reset observable state to initial state
   */
  reset() {
    this.assign({
      error: null,
      loaded: false,
      value: this.initialValue,
      pending: false,
      lastAttempt: 0,
      lastUpdated: 0,
    })
  }

  constructor(
    initialValue: T,
    fetchHandler: (...args: any) => Promise<T>,
    onError?: (error: Error) => void
  ) {
    this.fetchHandler = fetchHandler
    this.value = initialValue
    this.initialValue = initialValue
    this.onError = onError ?? AsyncData.defaultErrorHandler
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
