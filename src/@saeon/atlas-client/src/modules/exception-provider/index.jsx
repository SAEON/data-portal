import React, { createContext, Component } from 'react'

export const ExceptionContext = createContext()

export default class extends Component {
  componentDidCatch(error, info) {
    console.log(
      'TODO - Please implement this more effectively if you see this in the console',
      error,
      info
    )
  }

  render() {
    const { children } = this.props
    return <>{children}</>
  }
}
