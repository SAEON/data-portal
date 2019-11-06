import { PureComponent } from 'react'

export default class extends PureComponent {
  state = {}

  constructor(props) {
    super(props)
    this.map = this.props.map
  }

  componentDidMount() {}

  render() {
    return this.props.children({})
  }
}
