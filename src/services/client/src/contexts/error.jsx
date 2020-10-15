import { Typography, Link } from '@material-ui/core'
import React, { createContext, Component } from 'react'
import { MessageDialogue } from '../components'
import { WEB_DEVELOPER_CONTACT } from '../config'

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
      <MessageDialogue
        permanent
        hideIcon
        defaultOpen
        title="Application Error"
        text={
          <>
            <Typography variant="body2" style={{ marginBottom: 16 }} gutterBottom>
              {error}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Please try refreshing this page in a few minutes. If the error persists, or if
              assistance is required, please contact{' '}
              {
                <Link variant="body1" href={`mailto:${WEB_DEVELOPER_CONTACT}`}>
                  {WEB_DEVELOPER_CONTACT}
                </Link>
              }{' '}
              with a screenshot of this page so that we may resolve the issue speedily
            </Typography>
          </>
        }
      />
    ) : (
      <>{children}</>
    )
  }
}
