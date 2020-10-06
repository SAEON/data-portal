import React, { createContext, Component } from 'react'
import { MessageDialogue } from '../../components'

export const ExceptionContext = createContext()

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { error: undefined }
  }

  static getDerivedStateFromError(error) {
    return { error: error.message }
  }

  render() {
    const { props, state } = this
    const { children } = props
    const { error } = state
    return error ? (
      <MessageDialogue permanent hideIcon defaultOpen title="Application Error" text={error} />
    ) : (
      <>{children}</>
    )
  }
}
