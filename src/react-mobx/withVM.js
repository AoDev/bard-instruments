import React from 'react'
import * as mobxReact from 'mobx-react'
import PropTypes from 'prop-types'

/**
 * Tries to determine a Component's name
 * @param {function} Component
 */
function getComponentDisplayName (Component) {
  return (
    Component.displayName ||
    Component.name ||
    (Component.constructor && Component.constructor.name) ||
    'Unknown'
  )
}

/**
 * `withVM` is a higher order component that allows to easily keep separated
 * the definition of a component internal state and its actual view (render) part.
 *
 * Thinking in terms of React/Mobx patterns,
 * it can be viewed as a convenient HOC that creates "smart" or "container" components with extras.
 *
 * As a reminder, a `vm` or view-model, is an entity responsible for taking the system business
 * data and use cases and make them available to a user interface, such as a view.
 * In general, using these VM is recommended for top-level sections such as feature pages
 * or stand-alone "widgets".
 *
 * What `withVM` does technically:
 * - it turns the component it receives as first argument into mobx Observer.
 * - it instantiates a VM when the component is mounted and pass it to the component.
 *
 * Then, there are two ways to provide the business `app stores` to the vm / component:
 * - #1: The simple opiniated way (recommended)
 * - #2: For flexibility, custom inject / destroy functions can be passed.
 *
 * Usage example of the #1 opiniated way:
 * - The business data and logic is available through a "root store".
 * - This root store is provided as a prop called "rootStore" in React Context.
 *   For example using mobx-react Provider: `<Provider rootStore={rootStore}><App/></Provider>`
 * - Design the VM with the following characteristics:
 *   - the VM constructor expects an object as argument, one property being `rootStore`.
 *   - if necessary, a `destroyVM` method can be defined for cleanup. (automatically called on unmount)
 *
 * Pseudo code snippets:
 * ```
 * // UserFormComponent.js
 * function UserFormComponent (props) {
 *   const {vm} = props
 *   return (
 *     <div>
 *       <input value={vm.name}/>
 *       <input value={vm.email}/>
 *     </div>
 *   )
 * }
 *
 * // ----------------
 * // UserFormWithVM.js
 * import withVM from 'bard-instruments/lib/react-mobx/withVM'
 * import UserFormComponent from './UserFormComponent'
 *
 * class UserFormVM {
 *   @observable name = ''
 *   @observable email = ''
 *
 *   @action.bound set (prop, value) {
 *     this[prop] = value
 *   }
 *
 *   destroyVM () {
 *     // can be optionally defined if cleanup necessary
 *   }
 *
 *   constructor ({rootStore}) {
 *     // do something with rootStore
 *   }
 * }
 *
 * export default withVM(UserFormComponent, UserForm)
 *
 * // ----------------
 * // App
 * import UserFormVM from './UserFormVM'
 * function App {
 *   return (
 *     <div>
 *       <UserFormWithVM/>
 *     </div>
 *   )
 * }
 * ```
 *
 * @param {function} Component - React component that will be decorated
 * @param {(object|function)} options - Either custom inject, or Observable state VM class.
 * @param {function(props): vmProps} options.inject called with props from parent and rootStore
 * @param {function(vmProps): void=} options.destroyVM called when component unmounts
 */
export default function withVM (Component, options = {}) {
  const ObserverComponent = mobxReact.observer(Component)

  class VMProvider extends React.Component {
    static displayName = `${getComponentDisplayName(Component)}WithVM`
    static propTypes = {
      rootStore: PropTypes.object.isRequired,
    }

    /**
     * Creates the props that will be provided to the decorated component.
     * the rootStore is available in props through React context.
     * @param {*} props
     */
    constructor (props) {
      super(props)
      /**
       * If a class (mobx store) is provided directly, it is instantiated.
       * The React component will receive it as a prop called "vm".
       */
      if (typeof options === 'function') {
        this.vmProps = {vm: new options(props)} // eslint-disable-line
      }
      /**
       * If a custom inject function is provided, then it should return
       * props that will be injected in the component.
       */
      else if (options.inject) {
        this.vmProps = options.inject(props)
      }
      else {
        this.vmProps = {}
      }
    }

    componentWillUnmount () {
      /**
       * If a VM has a destroyVM method, it will be automatically called when unmount.
       */
      if (this.vmProps.vm && typeof this.vmProps.vm.destroyVM === 'function') {
        this.vmProps.vm.destroyVM()
      }
      /**
       * A custom destroyVM function can be passed in the options. It will be called with
       * the props generated from by the custom inject function.
       */
      if (options.destroyVM) {
        options.destroyVM(this.vmProps)
      }
    }

    render () {
      return <ObserverComponent {...this.props} {...this.vmProps}/>
    }
  }

  return mobxReact.inject('rootStore')(VMProvider)
}
