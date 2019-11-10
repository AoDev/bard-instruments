import * as mobx from 'mobx'

const {observable, action} = mobx

/**
 * Observable model of typical asynchronous data state
 *
 * Observable properties: `isUpdating`,`data`, `updatedAt`, `updateError`
 *
 * ### Usage example
 * Provide your model to a view, like a React component and manage the model in a store.
 *
 ```
 // NewsStore.js (pseudo code)
 import myNewsApi from 'myNewsApi'

 class NewsStore {
   news = new AsyncDataModel({
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
       {news.isUpdating && <p>Loading...</p>}
       {news.updateError && <p>Error</p>}
       {news.data.map((item) => <h3>{item.title}</h3>)}
     </div>
   )
 }
 ```
 */
class AsyncDataModel {
  [k: string]: any

  isUpdating = false
  data: any = null
  updatedAt: Date = null
  updateError: Error = null
  fetchHandler: (...args: any) => any

  /**
   * Update async data
   */
  async fetch (...args: any[]) {
    this.assign({isUpdating: true, updateError: null})
    try {
      const data = await this.fetchHandler(...args)
      this.assign({data, updatedAt: new Date()})
      return data
    }
    catch (error) {
      this.assign({updateError: error})
    }
    finally {
      this.set('isUpdating', false)
    }
  }

  /**
   * @param {String} prop
   * @param {*} value
   */
  set (prop: string, value: any) {
    this[prop] = value
  }

  /**
   * @param {Object} props
   */
  assign (props: object) {
    Object.assign(this, props)
  }

  /**
   * @param {{data?: *, fetchHandler: function}} options
   */
  constructor (options: { data?: any; fetchHandler: (...args: any) => any }) {
    this.fetchHandler = options.fetchHandler
    this.data = options.data
  }
}

export default mobx.decorate(AsyncDataModel, {
  // props
  isUpdating: observable,
  data: observable.ref,
  updatedAt: observable.ref,
  updateError: observable.ref,
  // actions
  fetch: action.bound,
  set: action.bound,
  assign: action.bound,
})
