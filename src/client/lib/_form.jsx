import { PureComponent } from 'react'

export default class extends PureComponent {
  state = {}
  constructor(props) {
    super(props)
    for (const prop in this.props) {
      if (Object.prototype.hasOwnProperty.call(this.props, prop)) {
        if (prop !== 'children') this.state[prop] = this.props[prop]
      }
    }
  }

  componentDidUpdate() {
    const { onComponentDidUpdate } = this.props
    if (onComponentDidUpdate) onComponentDidUpdate({ updateForm: this.updateForm, ...this.state })
  }

  updateForm = (obj, cb = null) => this.setState(obj, cb)

  render() {
    return this.props.children({
      updateForm: this.updateForm,
      ...this.state
    })
  }
}
