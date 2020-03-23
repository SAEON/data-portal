import { PureComponent } from 'react'

/**
 * General class component description in JSDoc format. Markdown is *supported*.
 */
export default class Form extends PureComponent {
  state = {}
  constructor(props) {
    super(props)
    for (const prop in this.props) {
      if (Object.prototype.hasOwnProperty.call(this.props, prop)) {
        if (prop !== 'children') this.state[prop] = this.props[prop]
      }
    }
  }

  updateForm = (obj, cb = null) => this.setState(obj, cb)

  render() {
    return this.props.children({
      updateForm: this.updateForm,
      ...this.state,
    })
  }
}
